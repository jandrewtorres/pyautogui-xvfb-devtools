# pyautogui-xvfb-devtools
## Author: jtorres
## March, 2023

## What is pyautogui-xvfb-devtools (pxd) ?

pxd is my answer to frustrations that arose when developing pyautogui automationscripts. What problems you ask? If you have ever tried to write a pyautogui script, you share my frustrations... bouncing back and forth between development IDEs, initial script target windows, and crossing your fingers that when you run the script all hell doesn't break loose during mouse and keyboard takeover.

## Features
- Dockerfile pre-configured with pyautogui and necessary linux packages.

 Develop the script in a seperate environment than the target run-time environment.

\* NOTE: For now, the target environment is Ubuntu, but you can change the dockerfile to run any Debian-flavor of Linux and it should run without problem.

- Web GUI / Script Builder Tools
 - Live Desktop Preview
Live read-only preview of your containerized target OS, shown in your webbrowser so you can see the state of your script while you develop it.

 - Script Builder Tools
   * Mouse Coordinates
Quickly grab coordinates by clicking anywhere on the Live Desktop Preview.
   * Screen Snapshot
Snap a selected area of the Live Desktop Preview, and save as an image file for use with pyautogui.locate() and other computer vision match/location functions.

- Getting Started

1. Build the Dockerfile and run the container.
```
$ ./docker-build.sh && ./docker-run.sh
```

2. Start the Web Client GUI.
```
$ cd client && yarn start
```

3. Open browser and navigate to `http://localhost:5000`

```
$ firefox http://localhost:5000
```

All commands:
```
$ ./docker-build.sh && ./docker-run.sh
$ cd client && yarn start
$ firefox http://localhost:5000
```
