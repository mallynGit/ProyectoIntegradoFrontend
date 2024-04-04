FROM node:20-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev", "--", "--host" ]

# docker build -t maruizlosada/frontend-tfg:v1 .
# docker push maruizlosada/frontend-tfg:v1
