# user-auth-service

user authentication and authorization service

## Steps to start

1. create `'.env'` file at the root of the project
2. add the following to `'.evn'` file
   - PORT=8000
   - JWT_SECRET=secret
   - JWT_EXPIRES_IN=6000000
   - DB_URL= will be sent by email
3. run `'npm i'`
4. to start the server run `'npm run start'`
5. to start and watch the server run `'npm run start:dev'`
6. find the postman collection in the docs folder that can be imported in the postman to test the apis.

## Run `'npm run test'` for testing the app
