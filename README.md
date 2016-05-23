# VoteWise API

Restful Api for VoteWise

# To start server

1) From root of project, npm install
2) node server.js
3) You can the make HTTP request from http://localhost:8080/api

# Admin api

http://localhost:8080/admin

Make a GET, DELETE, PUT, or POST to http://localhost:8080/admin/user to GET a list of users, DELETE a user, or make a user.

Random password: GET request to http://localhost:8080/admin/randompass it will default to 8 but if longer is needed you can pass it something like this http://localhost:8080/admin/randompass?length=10.
