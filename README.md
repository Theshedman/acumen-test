# Acumen Coding Challenge

- Author: Shedrack Ajaegbu
- Email: shedrack3@gmail.com
- phone: 08065172295


## API Documentation

Please use the following API documentation to interact with the API.

Postman API documentation: https://documenter.getpostman.com/view/5904643/UzBgvVM1

## Installation

To clone the project:

```bash
https://github.com/Theshedman/acumen-test.git
```

`cd` into the `acumen-test` directory

```bash
cd acumen-test
```

# Running The Application

The application can be run locally or in a container using docker

## 1. Using Docker
Make sure that Docker is installed in your system.

Create a docker network called `backend` this will help us to link our container to a postgres-db container
```bash
docker network create backend
```

Then, run the postgres docker image:
```bash
docker run \
  -d \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_USER=acumen \
  -e POSTGRES_DB=acumen \
  --name postgres \
  --network backend \
  postgres:14
```

Build the docker image by running this command:
```bash
docker build -t acumen-test .
```
After building the docker image, you can run it by executing this command:
```bash
docker run \
  -d \
  -e DB_HOST=postgres \
  -e DB_PORT=5432 \
  -e DB_NAME=acumen \
  -e DB_USER=acumen \
  -e DB_PASSWORD=123456 \
  -e NODE_ENV=development \
  -p 8088:8088 \
  --name acumen  \
  --network backend \
  acumen-test
````

### Run Test Coverage (for docker)

Run the below command to run the test for the application:

```bash
docker exec -it acumen yarn test
```
---

## 2. Running the application locally

**Note:** Node v14 and above is recommended.

install project dependencies
```
yarn install
```

#### Very important steps (the project would not run without these steps):
- create a `.env` file at the root of the project
- Copy the content of the `.env.sample` file [which is located at the root of the project] to the `.env` file you create above

Now, compile the Typescript files to Javascript:
```bash
yarn tsc
```

You can now lunch the application by running this command:
```bash
yarn start:prod
```

### Run Test Coverage (for local)

Open a new terminal window but make sure that you are in the `acumen-test` directory. Then, run the below command for test coverage:
```bash
yarn test
```
