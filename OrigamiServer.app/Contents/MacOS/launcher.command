#!/bin/bash
BASEDIR=$(dirname "$0")
cd "$BASEDIR"/tv_server
npm update --save
nodemon index.js

