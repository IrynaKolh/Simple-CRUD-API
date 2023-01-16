# Simple-CRUD-API
Your task is to implement simple CRUD API using in-memory database underneath.
TASK: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md

## 1
Please clone this repository.
Go to app folder.
Run `npm install` to get all dependensis. 

## 2
 `npm run start:dev`: Start server in development mode.
 `npm run start:prod`: Start server in production mode, compile all `.ts` files and save them to `/dist` folder.
 `npm run test`: to run tests;

 NB: In production mode you need copy .env.example to .env and configure your settings.

 ## 3

ENDPOINT:

    GET api/users is used to get all persons
        
    GET api/users/{userId} get user
        
    POST api/users is used to create record about new user and store it in database
        
    PUT api/users/{userId} is used to update existing user
        
    DELETE api/users/{userId} is used to delete existing user from database
       

 body example:

{
    "username": "NewUser",
    "age": 35,
    "hobbies": ["test", "cook", "draw"]
} 