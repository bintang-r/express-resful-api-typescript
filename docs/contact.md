# Contact Api Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "first_name": "Muhammad",
  "last_name": "Bintang",
  "email": "bintang@example.com",
  "phone": "034893459345"
}
```

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Muhammad",
    "last_name": "Bintang",
    "email": "bintang@example.com",
    "phone": "034893459345"
  }
}
```

Response Body (failed) :

```json
{
  "errors": "first_name must not blank, ..."
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Muhammad",
    "last_name": "Bintang",
    "email": "bintang@example.com",
    "phone": "034893459345"
  }
}
```

Response Body (failed) :

```json
{
  "errors": "Contact is not found, ..."
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "first_name": "Muhammad", // tidak wajib
  "last_name": "Bintang", // tidak wajib
  "email": "bintang@example.com", // tidak wajib
  "phone": "034893459345" // tidak wajib
}
```

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Muhammad",
    "last_name": "Bintang",
    "email": "bintang@example.com",
    "phone": "034893459345"
  }
}
```

Response Body (failed) :

```json
{
  "errors": "first_name must not blank, ..."
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

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
  "errors": "Contact is not found, ..."
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameter :

- name : string, contact first name or last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional
- page : number, default 1
- size : number, default 10

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Muhammad",
      "last_name": "Bintang",
      "email": "bintang@example.com",
      "phone": "034893459345"
    },
    {
      "id": 2,
      "first_name": "Fery",
      "last_name": "Fadul",
      "email": "fery@example.com",
      "phone": "0777893459345"
    }
  ],
  "page": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body (failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```
