#!/bin/bash

docker run -d \
  --restart unless-stopped \
  --name=mailer \
  -p 8025:8025 \
  -p 1025:1025 \
  axllent/mailpit:v1.8