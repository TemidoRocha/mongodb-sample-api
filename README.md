## mongodb-sample-api

Using the mongoDb sample data, this api will be a ongoing project to implement a MongoDb,
Mongoose, typescript Api to check all possible options of this tools.

<hr>

To start: https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/

1. npm init

2. npm i express dotenv cors helmet

express: Fast, unopinionated, minimalist web framework for Node.js.

dotenv: Zero-dependency module that loads environment variables from a .env file into process.env.

cors: Express middleware to enable CORS with various options.

helmet: Express middleware to secure your apps by setting various HTTP headers, which mitigate common attack vectors.
helmet is a collection of 14 small middleware functions that set HTTP response headers. Mounting helmet() doesn't include all of these middleware functions but provides you with sensible defaults such as DNS Prefetch Control, Frameguard, Hide Powered-By, HSTS, IE No Open, Don't Sniff Mimetype, and XSS Filter.

3. npm i -D typescript

To use TypeScript effectively, you need to install type definitions for the packages you installed previously

4. npm i -D @types/node @types/express @types/dotenv @types/cors @types/helmet

5. npm i -D ts-node-dev

## services

A service lets you encapsulate related business logic that you can share across multiple projects. As such, your application can use a service to access and manipulate records from your store.
