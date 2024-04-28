FROM node:20-alpine
RUN mkdir /app
WORKDIR /app
RUN npm install -g yarn
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "yarn", "dev", "--host" ]

# docker build -t maruizlosada/frontend-tfg:v1 .
# docker push maruizlosada/frontend-tfg:v1
