# Brainstorming
Part1
However part 1 is fairly simple, just by adding try and catch block would fix the problem, since the format being sent by data-emulator might be wrong. So i print out the error message to make sure we know what is going wrong while still making the server running.

Part2
For part2 I understand the question in a way that there is a 5 seconds window we are consistently checking whether in this window there are more than 3 timestamp where the tempreture is out of the safe range.


Part4
1. eslint
Since data-emulator file can not be changed, so I assume the correct indentation is 4, I also let eslint ignore this file to prevent it from being changed by lint-fix by adding the file name to .eslintignore.

since all subdirectory have ts and tsx which is their common part, i decided to include style check for ts and tsx in root directory to reduce redundency, because i believe if subdirectory differ a lot, we need to set them up seperately. Another reason to do so is that i notice in battery-ui there are set-up about eslint config extending the style check root, so i suppose you want us to extend from root, and adding addtional rules for react.

though in cicd the test is run at root, but i still set up the jest script for all the subdirectries, which enables developer to control which test suits to run based on the directory they are in.

2. testing
I only implemented dummy tests, which could be repalced with actual tests.

3. docker
I successfully build the docker image and push to the docker hub, the user name and password are stored as github secrets.