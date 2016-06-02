# VoteWise API

Restful Api for VoteWise

# To start server

1) From root of project, npm install
2) node server.js
3) You can then make HTTP request from http://localhost:8080

# Create a user( voter example )

Make a POST request with form data to http://localhost:8080/signup

The keys that need to be filled are:
name, city, street, zip, username, email

on success you will receive a JSON object

{
    "success": true
}

if there are any errors it will return

{
"success": false
"errors": "A list of errors of what went wrong"
}

# Authenticate user

Make a POST request with form data to http://localhost:8080/authenticate

The keys that need to be filed are:
email, and password

on success

  {
  "success": true,
  "message": "Enjoy your token!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImFkZHJlc3MiOiJpbml0IiwicHJlc3MiOiJpbml0IiwiYWR2b2NhdGUiOiJpbml0IiwicG9saXRpY2lhbiI6ImluaXQiLCJhZG1pbiI6ImluaXQiLCJnZW9EaXYiOiJpbml0IiwicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwibmFtZSI6ImluaXQiLCJjcmVhdGVkIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImNyZWF0ZWQiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJnZW9EaXYiOnRydWUsImVtYWlsIjp0cnVlLCJhZGRyZXNzIjp0cnVlLCJhZHZvY2F0ZSI6dHJ1ZSwicHJlc3MiOnRydWUsInBvbGl0aWNpYW4iOnRydWUsImFkbWluIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwibmFtZSI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7ImNyZWF0ZWQiOiIyMDE2LTA2LTAyVD
}

This token needs to be saved and sent with every request to authorized routes.


# Get a list of all users

Make a GET request to http://localhost:8080/admin/user/all

with headers 'x-access-token': 'token ( as seen above )'

The server checks the token and if the user is authorized, it will return a list of users.

# Simple request examples

GET to http://localhost:8080/ziplookup/state/:statecode

i.e. http://localhost:8080/ziplookup/state/PA

Will return a list of all the zipcodes in PA.

{
  "zip": [
    {
      "_id": "574a9c32cd24d8720cfdc7be",
      "zip": 15003,
      "state": "PA",
      "county": "Beaver County",
      "__v": 0,
      "city": [
        "Beaver County"
      ]
    },
    {
      "_id": "574a9c32cd24d8720cfdc7bd",
      "zip": 15001,
      "state": "PA",
      "county": "Beaver County",
      "__v": 0,
      "city": [
        "Beaver County",
        "Macarthur",
        "W Aliquippa"
      ]
    },
    {
      "_id": "574a9c32cd24d8720cfdc7bf",
      "zip": 15004,
      "state": "PA",
      "county": "Washington County",
      "__v": 0,
      "city": []
    } ..... and so on
