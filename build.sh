#!/bin/sh

node -v
npm config set registry https://registry.npm.taobao.org
npm install
npm run build