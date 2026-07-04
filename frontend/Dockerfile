# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 5173

# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Base image 
FROM node:22-alpine 

# creating directory 
WORKDIR /app

# copy dependencies into current directory 
COPY package*.json ./

# genrating node module 
RUN npm install

# Copy all source code files into the current dir 
COPY .  .

# exposing the port on 5173
EXPOSE 5173

# start container 
CMD ["npm","run","dev"]

