FROM node:12-stretch

# Add metadata about the image
LABEL maintainer="Göran Sander mountaindude@ptarmiganlabs.com"
LABEL description="Reads energy data from a Garo GNM1D 1-phase energy meter with Modbus over RS-485 and a Moxa 5630-16."

# Create app dir inside container
WORKDIR /nodeapp

# Install app dependencies separately (creating a separate layer for node_modules, effectively caching them between image rebuilds)
COPY package.json /nodeapp
RUN npm install

# Create and use non-root user 
RUN groupadd -r -g 999 nodejs && useradd -m -r -u 999 -g nodejs nodejs

USER nodejs

# Copy app's source files
COPY . /nodeapp

CMD ["node", "index.js"]
