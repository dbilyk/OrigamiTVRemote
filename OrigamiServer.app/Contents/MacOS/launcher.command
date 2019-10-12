#!/bin/bash
BASEDIR=$(dirname "$0")
cd "$BASEDIR"/tv_server
npm install
nodemon index.js

