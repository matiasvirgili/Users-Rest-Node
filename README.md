# API Rest - Users

## What is about?

This project consists of a simple "Rest API" to manage users, with the basic options of "get, post, put and delete"

## Technology stack

-Node.js
-Express
-Mongoose

## How to run this proyect?

1. Clone the project
```sh
git clone https://github.com/matiasvirgili/Users-Rest-Node
```

2. Open folder and create and config your environment variables in a `.env` file, you can use the `.env.example` as a guid
3. Install packages and run the project
```sh
npm install
npm start
```
4. Open the url of the localhost with your assigned port in ".env". Ex: localhost:9999

## Deployed on Heroku
You can test this app at
[Heroku_Ivan](https://users-rest-node.herokuapp.com/)
 OR 
[Heroku_Matias](https://users-node-rest.herokuapp.com)

## API Specification
### Get users
`GET /users/`

You can use this query:
```sh
/users?name=(name you want to search in users)
/users?lastName=(last name you want to search in users)
/users?telephone=(telephone you want to search in users)
/users?direction=(direction you want to search in users)
/users?dni=(DNI you want to search)
```

### Get user by id
`GET /users/:usersId`

ex: /users/615dfd72a5b90ed6106bb2cb

### Add or modify user 

Add:
```sh
POST /users/
```
Modify
```sh
PUT /users/:usersId
```

To add or modify users you need the following fields:

```
{
    "name": "Ivan",
    "lastName": "Sangermano",
    "telephone": "22222222",
    "direction": "Acapulco 4444",
    "dni" : "44444444"
}
```
### Delete user

`DELETE /users/:usersId`


