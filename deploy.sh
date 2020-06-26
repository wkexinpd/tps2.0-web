#!/bin/sh

sudo rm -rf /usr/share/nginx/html/tps_web/*
sudo cp -r /var/lib/jenkins/workspace/tps_web/dist/* /usr/share/nginx/html/tps_web