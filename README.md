# Kickstarter Success API Documentation

# Installation

> npm install

# Startup

> npm run server

# Endpoints

### Heroku API Link

> [https://kickstarter-backend-bw.herokuapp.com/](https://kickstarter-backend-bw.herokuapp.com/)

## User Registration

#### POST

`api/auth/register`

##### Expects the following object to be sent

`{ username: "string", password: "string" }`

##### If successful, returns User ID and Username.

## User Login

#### POST

`api/auth/login`

##### Expects the following object to be sent

`{ username: "string", password: "string" }`

##### If successful, returns generated Token.

## Get Campaigns By User ID

#### GET

`api/campaigns/users/:id`

##### Expects a User ID

##### Returns array of campaigns tied to a User.

## Gets Campaign By Campaign ID

#### GET

`api/campaigns/:id`

##### Expects a Campaign ID

##### Returns Campaign object.

## Create New Campaign

#### POST

`api/campaigns/`

##### Expects the following object to be sent

`{ user_id: integer, name: "string, description: "string", campaign_length: integer, category: "string", monetary_goal: integer, success_prediction: integer}`

##### If successful, returns created Campaign.

## Edit Campaign By Campaign ID

#### PUT

`api/campaigns/:id`

##### Expects the following object to be sent

`{ user_id: integer, name: "string, description: "string", campaign_length: integer, category: "string", monetary_goal: integer, success_prediction: integer}`

##### If successful, Campaign should reflect updated information.

## Delete Campaign

#### DELETE

`api/campaigns/:id`

##### Expects a Campaign ID
