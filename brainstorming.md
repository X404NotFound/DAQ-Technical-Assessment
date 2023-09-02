# Brainstorming
Part1
In Part 1, I've introduced a try-catch mechanism. This should manage any format inconsistencies coming from the data-emulator. If there’s an error, we'll know about it, but the server won't crash.

Part2
For this section, I've set a 5-second window to monitor temperature. If the temperature goes out of range more than three times in this window, it's logged. I've also made sure the logs are stored in a format that's easy to understand.

Part3
Color Coding: The color now shifts based on temperature proximity to the limits. It's a gradient: green for safe zones and red when it's nearing unsafe levels.

For Alerts,
I've set up:
1. Temperature alerts when the battery heats up too much.
2. General battery alerts for when it's not operating as it should(when it is logged).

The user could also see the readings of Fahrenheit, catering to those who prefer this scale. Kept other additions minimal to avoid making the interface too complicated.

Part4
1. eslint
The data-emulator file remains untouched. To ensure it stays that way, I added it to .eslintignore.
Since ts and tsx formats are present across all subdirectories, I've centralized their style checks in the main directory. This approach minimizes redundancy. I also observed that in battery-ui, the eslint config extends the root's style checks. Based on this, I decided to have the subdirectories extend configurations from the root while adding additional rules specific to React.

2. testing
We've got placeholder tests at the moment. These are temporary until we get our actual tests in place.
Even though our CI/CD runs tests from the main folder, I've ensured that jest scripts are set up for each subdirectory. This gives developers the option to run specific tests based on their current directory.

3. docker
The Docker image is now avaliable on docker hub. For security, the username and password are kept as GitHub secrets.