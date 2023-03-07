#!/bin/bash
echo "Starting Xvfb on display :99 ..."
touch ~/.Xauthority
mkdir ~/screenshots
export DISPLAY=:99
Xvfb $DISPLAY -screen 0 1280x720x24 &
echo "Starting Flask server..."
python3 -m flask run --host=0.0.0.0 --port=5000 &
echo "Opening Firefox..."
firefox http://www.google.com

