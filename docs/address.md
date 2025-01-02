# Address Api Spec

## Create Address

Endpoint : POST /api/contacts/:idContacts/addresses

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "street": "nama jalan",
  "city": "nama kota",
  "province": "nama provinsi",
  "country": "nama negara",
  "postal_code": "123321"
}
```

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "street": "nama jalan",
    "city": "nama kota",
    "province": "nama provinsi",
    "country": "nama negara",
    "postal_code": "123321"
  }
}
```

Response Body (failde) :

```json
{
  "errors": "postal_code is required, ..."
}
```

## Get Address

Endpoint : GET /api/contacts/:idContacts/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "street": "nama jalan",
    "city": "nama kota",
    "province": "nama provinsi",
    "country": "nama negara",
    "postal_code": "123321"
  }
}
```

Response Body (failde) :

```json
{
  "errors": "Address is not found, ..."
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContacts/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "street": "nama jalan",
  "city": "nama kota",
  "province": "nama provinsi",
  "country": "nama negara",
  "postal_code": "123321"
}
```

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "street": "nama jalan",
    "city": "nama kota",
    "province": "nama provinsi",
    "country": "nama negara",
    "postal_code": "123321"
  }
}
```

Response Body (failde) :

```json
{
  "errors": "Unauthorize, ..."
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContacts/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": "Ok"
}
```

Response Body (failde) :

```json
{
  "errors": "Address is not found, ..."
}
```

## List Address

Endpoint : GET /api/contacts/:idContacts/addresses

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": [
    {
      "id": 1,
      "street": "nama jalan",
      "city": "nama kota",
      "province": "nama provinsi",
      "country": "nama negara",
      "postal_code": "123321"
    },
    {
      "id": 2,
      "street": "nama jalan",
      "city": "nama kota",
      "province": "nama provinsi",
      "country": "nama negara",
      "postal_code": "321123"
    }
  ],
  "page": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body (failde) :

```json
{
  "errors": "Contact is not found, ..."
}
```
