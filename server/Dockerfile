FROM node

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# for typescript
RUN npm run build
COPY ormconfig.json ./dist/
COPY .env ./dist/
WORKDIR ./dist

EXPOSE 4000
CMD node src/index.js