# energy-monitor-1

## Docker build instructions

```bash
docker build --no-cache \
-t mountaindude/energy-monitor-1:latest \
-t mountaindude/energy-monitor-1:1.0.0 \
-t mountaindude/energy-monitor-1:v1.0.0 \
-t mountaindude/energy-monitor-1:1.0 \
-t mountaindude/energy-monitor-1:v1.0 \
-t mountaindude/energy-monitor-1:1 \
-t mountaindude/energy-monitor-1:v1 \
.


docker push mountaindude/energy-monitor-1:latest
docker push mountaindude/energy-monitor-1:1.0.0
docker push mountaindude/energy-monitor-1:v1.0.0
docker push mountaindude/energy-monitor-1:1.0
docker push mountaindude/energy-monitor-1:v1.0
docker push mountaindude/energy-monitor-1:1
docker push mountaindude/energy-monitor-1:v1
```
