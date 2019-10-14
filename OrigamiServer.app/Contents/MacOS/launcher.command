#!/bin/bash
BASEDIR=$(dirname "$0")
cd "$BASEDIR"/tv_server
sudo chown -R $USER ./node_modules
chmod +w ./node_modules
npm update --save
nodemon index.js

