FROM node:14

EXPOSE 3000

# Use latest version of npm
RUN npm install npm@latest -g

# Install the nestJs CLI
RUN npm install -g @nestjs/cli

COPY package.json package-lock.json* ./

RUN npm install --no-optional && npm cache clean --force

# copy in our source code last, as it changes the most
WORKDIR /app

COPY . .

CMD [ "npm", "run", "start" ]