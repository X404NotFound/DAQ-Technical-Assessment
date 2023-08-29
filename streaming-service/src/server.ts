import net from 'net';
import { WebSocket, WebSocketServer } from 'ws';
import fs from 'fs';
import * as type from './types';

const TCP_PORT = parseInt(process.env.TCP_PORT || '12000', 10);

const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: 8080 });

let violations: type.batteryData[] = []; // a 5 seconds window

tcpServer.on('connection', (socket) => {
    console.log('TCP client connected');
    
    socket.on('data', (msg) => {
        //console.log(msg.toString());

        try {
            let currJSON = JSON.parse(msg.toString());
            if (!isValidData(currJSON)) { // make sure currJSON is of valid type
                return;
            }
            if (currJSON["battery_temperature"] < 20 || currJSON["battery_temperature"] > 80) {
                violations.push(currJSON); // push the data to the violations array
            }
            trimViolations(currJSON); // maintain a 5 seconds window

            console.log(violations);
            if (violations.length > 3) {
                logViolation(currJSON.timestamp); // log to the file
            }
        } catch(error) {
            console.error("An error occurred when parsing JSON:", error);
        }
        
        websocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg.toString());
            }
        });
    });

    socket.on('end', () => {
        console.log('Closing connection with the TCP client');
    });
    
    socket.on('error', (err) => {
        console.log('TCP client error: ', err);
    });
});

websocketServer.on('listening', () => console.log('Websocket server started'));

websocketServer.on('connection', async (ws: WebSocket) => {
    console.log('Frontend websocket client connected to websocket server');
    ws.on('error', console.error);  
});

tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP server listening on port ${TCP_PORT}`);
});

// belows are helper functions

function isValidData(data: any): boolean {
    return typeof data === 'object' && // make sure currJSON is not parsed to something else like string or array
           "battery_temperature" in data && // make sure the keys exist
           typeof data["battery_temperature"] === 'number' && // make sure the value for the given key is number which is a tempreture
           "timestamp" in data; // make sure the keys exist
}

function trimViolations(currJSON: type.batteryData): void {
    violations = violations.filter(violation => violation.timestamp >= currJSON.timestamp - 5000);
}

function logViolation(timestamp: number): void {
    try {
        let violationDate = new Date(timestamp); // assume its based on miliseonds
        fs.appendFileSync('incidents.log', `The battery was not running safely at ${violationDate.toLocaleString()}\n`);
    } catch (err) {
        console.error("Error writing to the log", err);
    }
}