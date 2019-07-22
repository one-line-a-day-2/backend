# One Line a Day 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

If you have ```npm``` installed, you can just install Yarn with npm:

```
$ npm install yarn --global
```

### Installing

A step by step series of examples that tell you how to get a development env running

From the /notes folder run yarn install

```
$ yarn install
```

Followed by the appropriate start command

```
# yarn
$ yarn server
```

## Deployment

### Front End
* [Netlify](https://www.netlify.com/) - Web Hosting Service
* [GitHub](https://github.com/gittc100/One_Line_A_Day_Thomas_Front_End)

### Back End
* [Heroku](https://www.heroku.com/) - Server and Database Hosting Service
- Production URL: https://one-line-a-day-2.herokuapp.com


## Built With

* [Node.js](https://nodejs.org/en/) - Server Runtime
* [Express](https://expressjs.com/) - Node.js Framework
* [Knex.js](https://knexjs.org/) - SQL query builder
* [SQLite](https://sqlite.org/index.html) - SQL database engine
* [Jest](https://jestjs.io/) - Testing Framework

## Author

* **Thomas Claydon** - [Github](https://github.com/gittc100)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

#### Endpoints

| Method | Endpoint      | Description                                                                   | body                  |
| ------ | ------------- | ----------------------------------------------------------------------------- | --------------------- |
| POST   | /api/register | Creates a `user` using the information sent inside the `body` of the request. `username` and `email` require `unique values`, all values are require for post success. | { "username": "string", "password": "string", "firstname": "string", "lastname": "string", "email": "string" } |
| POST   | /api/login | Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client, via localstorage. equired Storage KEY: `jwt`. Example: `localStorage.setItem("jwt", res.data.token);`| {"username": "string", "password": "string"} |
| GET    | /api/users | If the user is logged in, the response will contain an `array` of all the users in the database. If the user is not logged in the response will be an error code. | --- |
| GET    | /api/users/userID | `userID` is a dynamic variable set by the front end. If the user is logged in, and `userID` is correct, the response will an object with the user info. If the user is not logged in or does not exist, the response will be an error code. | --- |
| DELETE | /api/users/userID | `userID` is a dynamic variable set by the front end. If the user is logged in, and `userID` is correct, the response will be an empty object and the user will be deleted from the database. If the user is not logged-in or does not exist, the response will be an error code. | --- |
| PUT    | /api/users/userID |  `userID` is a dynamic variable set by the front end. If the user is logged in, and `userID` is correct, the response will be 1. If the user is not logged-in or does not exist, the response will be an error code. All values are required for put success. | { "username": "string","password": "string","firstname": "string", "lastname": "string", "email": "string" } |
| GET    | /api/users/userID/entries | `userID` is a dynamic variable set by the front end. If the user is logged in, and `userID` is correct, the response will an object with the users entry info. If the user is not logged or has no entries, the response will be an error code. | --- |
| POST   | /api/users/userID/entries |`userID` is a dynamic variable set by the front end. If the user is logged in, and `userID` is correct, the response will be a new entry. If the user is not logged in, the response will be an error code. All values are required for a successful post. |{ "entry": "string", "user_id": `integer` equal to the associated `user` `id` }|
| GET    | /api/users/userID/entries/entryID | `userID` and `entryID` are dynamic variable's set by the front end. If the user is logged in, `userID`/`entryID` are correct, and the entry exists, the response will be an object with the users entry. If the user is not logged-in or `userID`/`entryID` are incorrect or does not contain the entry, the response will be an error code. | --- |
| DELETE | /api/users/userID/entries/entryID | `userID` and `entryID` are dynamic variable's set by the front end. If the user is logged in, `userID`/`entryID` are correct, and the entry exists, the response will be an empty object and the entry shall be removed from the database. If the user is not logged-in or `userID`/`entryID` are incorrect or does not contain the entry, the response will be an error code. | --- |
| PUT    | /api/users/userID/entries/entryID | `userID` and `entryID` are dynamic variable's set by the front end. If the user is logged in, `userID`/`entryID` are correct, and the entry exists, the response will be a 1. If the user is not logged-in or `userID`/`entryID` are incorrect or does not contain the entry, the response will be an error code. All values are required for a successful put. | { "entry": "string", "user_id": `integer` equal to the associated `user` `id` } |
| GET    | /api/users/quantity | The response will be the `integer` of the current QTY of users | --- |
