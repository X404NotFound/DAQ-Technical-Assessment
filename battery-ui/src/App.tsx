import React, { useState, useRef, useEffect } from 'react';
import LiveValue from './live_value'
import RedbackLogo from './redback_logo.jpg';
import './App.css';

function App() {

  const [temperature, setTemperature] = useState<number>(0);
  const [temWarning, setTemWarning] = useState<boolean>(false); // hold the state for warning
  const [batWarning, setBatWarning] = useState<boolean>(false);

  const ws: any = useRef(null);

  useEffect(() => {
    // using the native browser WebSocket object
    const socket: WebSocket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("opened");
    };

    socket.onclose = () => {
      console.log("closed");
    };

    socket.onmessage = (event) => {
      console.log("got message", event.data);
      let message_obj = JSON.parse(event.data);
      setTemperature(message_obj["battery_temperature"].toPrecision(3));

      if(message_obj["temWarning"]) { // check value stored in key
        setTemWarning(true);
      } else {
        setTemWarning(false);
      }

      if(message_obj["batWarning"]) { // check value stored in key
        setBatWarning(true);
      } else {
        setBatWarning(false);
      }
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  return ( // The right hand side will be rendered only if the warning is true.
    <div className="App">
      <header className="App-header">
      <img src={RedbackLogo} className="redback-logo" alt="Redback Racing Logo"/>

        <p className='value-title'>
          Live Battery Temperature
        </p>
        <LiveValue temp={temperature}/>
        {temWarning && <div className="warning">Warning! Temperature out of safe range!</div>}
        {batWarning && <div className="warning">Warning! Battery is not runnning safely!</div>}
      </header>
    </div>
  );
}

export default App;
