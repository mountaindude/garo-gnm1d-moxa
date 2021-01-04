# garo1p-moxa

## Overview

This repository contains code for extracting data from Garo 1-phase energy meter xxxx.  
Meter readings are available via a RS-485 interface.  
A Moxa 5630 serial-to-tcp converter is used to make the meter readings available via a TCP port.
Once the energy data has been extracted it's stored in an InfluxDB time series database.

Optionally, info and failure notifications can be sent to a Slack channel.

## Technical details

### Hardware

- Garo ....
- Moxa 5630-16

Other Moxa devices will probably also work too.  
For example, there are other Moxa models with different number of ports.

Another repository contains code for Garo 3-phase energy meters.

### Software

- The code is developed and tested against Node.js 14.5.3.
- The service can be run as a native Node.js app, but Docker is by far the preferred option for running the service. Kubernetes also works really well, but requries more infrastructure, setup etc.
- Docker images (mountaindude/garo1p-moxa:latest) is available from Docker hub.
- An InfluxDB database. InfluxDB runs very nicely as a Docker container (just make sure to store the actual data outside of the InfluxDB container, so it's not lost if the InfluxDB container is recreated..).
- Optional: A Slack account to which notifications can be sent.

## Docker build instructions

```bash
docker build --no-cache \
-t mountaindude/garo1p-moxa:latest \
-t mountaindude/garo1p-moxa:1.0.0 \
-t mountaindude/garo1p-moxa:v1.0.0 \
-t mountaindude/garo1p-moxa:1.0 \
-t mountaindude/garo1p-moxa:v1.0 \
-t mountaindude/garo1p-moxa:1 \
-t mountaindude/garo1p-moxa:v1 \
.


docker push mountaindude/garo1p-moxa:latest
docker push mountaindude/garo1p-moxa:1.0.0
docker push mountaindude/garo1p-moxa:v1.0.0
docker push mountaindude/garo1p-moxa:1.0
docker push mountaindude/garo1p-moxa:v1.0
docker push mountaindude/garo1p-moxa:1
docker push mountaindude/garo1p-moxa:v1
```
