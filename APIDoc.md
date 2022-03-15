# API

Every api requests must be started by /api. Example: localhost:3000/api/users/

## USERS API

### POST

1. /api/users/registration

This route takes json string like

```
{
    "email": "user@example.com",
    "password": "some_password"
}
```

Validation:

- Email is required and must be email
- Password have to have length more than 6 symbols

Response:

    status: 201
    body: token (JWT token for new user)

This route create new user in database. You can't create more than 1 user with same emails

<hr>

2. /api/users/login

This route takes json string like

```
{
    "email": "user@example.com",
    "password": "some_password"
}
```

Validation:

- Email is required and must be email
- Password have to have length more than 6 symbols

Response:

    status: 200
    body: token (JWT token for user)

You can't login, if database hasn't user

<hr>

### GET

1. /api/users

This route needs authorization header like

    Bearer *JWT*

You should be admin for take response

Response:

    status: 200
    body: lines (list of objects with userdata)

<hr>

### DELETE

1. /api/users/:id

This route needs authorization header like

    Bearer *JWT*

You should be admin for take response

Response:

    status: 200
    body: deleted(0/1) (1 if user succsessfully deleted)

This route delete user from database

<hr>

### PUT

1. /api/users/:id

This route needs authorization header like

    Bearer *JWT*

You can use only your id, if you are not admin

Response:

    status: 200
    body: message: "Данные успешно обновлены"

This route update the userdata

<hr>