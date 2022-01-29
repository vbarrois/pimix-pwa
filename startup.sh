#!/bin/sh

echo "Starting $NODE_ENV mode environment"
cd /usr/src/pimix/pimix-pwa
yarn install
yarn dev
