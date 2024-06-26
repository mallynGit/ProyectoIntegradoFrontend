FROM node:20-alpine
RUN mkdir /app
WORKDIR /app
# RUN npm install -g yarn
COPY package*.json ./
RUN yarn install --frozen-lockfile && \
yarn cache clean
COPY . .
RUN mv .env.production .env
EXPOSE 3000
CMD [ "yarn", "dev", "--host" ]

# docker build -t maruizlosada/frontend-tfg:v1 .
# docker push maruizlosada/frontend-tfg:v1
