<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

## General info
This project is demo E-Commerce application using Nestjs framework and PostgreSQL DataBase.

## app Features
```bash
1- user authentication (sign up and sign in) using jwt.
2- users can create and show all active products.
3- users can create order with needed products.
4- users can complete/cancel orders.
5- users can shoe their orders.
6- admin users can show all created orders.
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

```

# Services  Documentation 

$  You have to provide a JWT token to start using the APIs

## Base URL:
```bash
 http://localhost:3000/
```

## heroku application URL :
```bash  
  https://obscure-wave-92369.herokuapp.com/
```

## Swagger Documentation Path is /api-docs

## /auth/signup  
```bash
method => Post
 request body:
 {
 "email": "example@gmail.com",
 "password": "123456",
 "admin": true/false
 }

response body:
   return created user.
   

```
 ## /auth/signin 
 
  ```bash
  
  method => Post
  request body:
   {
   "email": "example@gmail.com",
   "password": "123456",
   }
 
 response body:
   return access token.
 
```
 
 ## /item/create 
 
 ```bash
 
  Authorization: Bearer token
 method => Post
  request body:
   {
   "name": "product1",
   "count": "100",
   "price": 100,
   "isActive": true/false
   }
 
 response body:
   return created item.
   
```
 
 ## /item/all?limit=20&page=1 
 
 ```bash
  Authorization: Bearer token
 method => Get
  request query:
   {
   "limit": 20,
   "page": 1,
   }
 
 response body:
   return all items.
 
```

 ## /item/active?limit=20&page=1 

```bash
 Authorization: Bearer token
method => Get
   request query:
     {
     "limit": 20,
     "page": 1,
     }
 
 response body:
   return all active items
   
```

## /order/create  

```bash
 Authorization: Bearer token
method => Post
  request body:
   {
   "totalPrice": 100,
   "itemIds": [1 , 2]
   }
 
 response body:
   return created order.
   
```

## /order?limit=20&page=1 

```bash
 Authorization: Bearer token
method => Get
    request query:
       {
       "limit": 20,
       "page": 1,
       }

 
 response body:
   return user orders.
   
```

## /order/all?limit=20&page=1  

```bash
 Authorization: Bearer token
method => Get
  request query:
     {
     "limit": 20,
     "page": 1
     }
 
 response body:
   return all created orders admin only.
   
```

## /order/cancel/id 

```bash
 Authorization: Bearer token
method => Post
  request param:
     {
     "id": 1
     }
 
 response body:
   return canceled order.
   
```

## /order/complete/id  

```bash
 Authorization: Bearer token
method => Post
  request param:
     {
     "id": 1
     }
 
 response body:
   return completed order.
   
```
   
   
   
