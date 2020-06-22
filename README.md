# Kickstarter Success API Documentation

# Installation and Startup

> npm install
> npm run server

# Endpoints

### Heroku API Link

> [https://kickstarter-backend-bw.herokuapp.com/](https://kickstarter-backend-bw.herokuapp.com/)

## Registration

#### POST

`api/auth/register`

##### Expects the following object to be sent

`{ "username": "string", "password": "string" }`

##### If successful, returns User ID and Username.

## Login

#### POST

`api/auth/login`

##### Expects the following object to be sent

`{ "username": "string", "password": "string" }`

##### If successful, returns generated Token.
