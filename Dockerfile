FROM node:20-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "src/main.js" ]

# docker build -t maruizlosada/frontend-tfg:v1 .
# docker push maruizlosada/frontend-tfg:v1
