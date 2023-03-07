import subprocess
import os
from flask import Flask, Response
app = Flask(__name__)
import pyautogui as pag

# Define a generator function to continuously stream the latest JPEG image to clients
def generate():
    while True:
        if os.path.isfile('./frame.jpg'):
            os.remove('./frame.jpg')
        frame = pag.screenshot('./frame.jpg')
        with open('./frame.jpg', 'rb') as f:
            frame = f.read()
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/stream.jpg')
def stream():
    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    pag._pyautogui_x11._display = Xlib.display.Display(os.environ['DISPLAY'])
    app.run(debug=True)