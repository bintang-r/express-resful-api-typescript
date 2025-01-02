# User Api Spec

## Register User

Endpoint : POST api/users

Request Body :

```json
{
  "username": "Bintang",
  "password": "rahasia",
  "name": "Bintang Kun"
}
```

Response Body (success) :

```json
{
  "data": {
    "username": "Bintang",
    "name": "Bintang Kun"
  }
}
```

Response Body (failed) :

```json
{
  "errors": "Username must not blank blank, ..."
}
```

## Login user

Endpoint : POST api/users/login

Request Body :

```json
{
  "username": "Bintang",
  "password": "rahasia"
}
```

Response Body (success) :

```json
{
  "data": {
    "username": "Bintang",
    "name": "Bintang Kun",
    "token": "uuid"
  }
}
```

Response Body (failed) :

```json
{
  "errors": "Username or password wrong"
}
```

## Get User

Endpoint : GET api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": {
    "username": "Bintang",
    "name": "Bintang Kun"
  }
}
```

Response Body (failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```

## Update User

Endpoint : PATCH api/users/current

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "password": "rahasia", // tidak wajib
  "name": "Bintang Kun" // tidak wajib
}
```

Response Body (success) :

```json
{
  "data": {
    "username": "Bintang",
    "name": "Bintang Kun"
  }
}
```

Response Body (failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```

## Logout User

Endpoint : DELETE api/users

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": "Ok"
}
```

Response Body (failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```
