#!/bin/bash
BASEDIR=$(dirname "$0")
cd "$BASEDIR"/tv_server
sudo npm update --save
nodemon index.js

