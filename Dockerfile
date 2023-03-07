FROM ubuntu:20.04

# apt-get update / install linux packages
# add new user
RUN apt-get update \ 
    && DEBIAN_FRONTEND=noninteractive \
    apt-get install --no-install-recommends --assume-yes \
        firefox \
        python3-dev \
        python3-pip \
        python3-tk \
        xvfb \
        scrot \
    && rm -rf /var/lib/apt/lists/*

# Flask server and init files
COPY app.py app.py
COPY init.sh init.sh

# install python reqs
COPY requirements.txt requirements.txt
RUN python3 -m pip install -r ./requirements.txt 

# Expose port 5000 for client @ http://localhost:5000
EXPOSE 5000

# Run init.sh script to start Flask app (app.py)
CMD bash init.sh
