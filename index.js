const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerDef = require("./helper/swagger.helper");
const route = require('./route/routes')
const express = require('express')
const app = express()


require('dotenv').config()

const port = process.env.PORT || 3000

const swaggerConfig = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Backend Challenge 5 Swagger Implementation",
        version: "1.0.0",
        description: "MyBank API for handling Users, Accounts, and Transactions",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Enter your Token to gain access",
          },
        },
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: [
      "./route/user.route.js",
      "./route/akun.route.js"
    ],
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerConfig);
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  app.use("/", router);
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))
  

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', route)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app
