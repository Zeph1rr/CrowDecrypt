# API

Every api request must be started with /api. Example: localhost:3000/api/users/

## USERS API

### POST

1. /api/users/registration

This route takes json string as

```
{
    "email": "user@example.com",
    "password": "some_password"
}
```

Validation:

- Email is required and must be presented as an email
- Password's length should be more than 6 symbols

Response:

    status: 201
    body: token (JWT token for new user)

This route creates new user in the database. You can't create more than 1 user with same email.

<hr>

2. /api/users/login

This route takes json string as

```
{
    "email": "user@example.com",
    "password": "some_password"
}
```

Validation:

- Email is required and must be presented as an email
- Password's length should be more than 6 symbols

Response:

    status: 200
    body: token (JWT token for user)

You can't login, if database doesn't have any users

<hr>

### GET

1. /api/users

This route requires authorization header like

    Bearer *JWT*

You should be an admin to take a response

Response:

    status: 200
    body: lines (list of objects with userdata)

<hr>

### DELETE

1. /api/users/:id

This route requires authorization header like

    Bearer *JWT*

You should be an admin to take a response

Response:

    status: 200
    body: deleted(0/1) (1 if user succsessfully deleted)

This route deletes user from the database

<hr>

### PUT

1. /api/users/:id

This route requires authorization header like

    Bearer *JWT*

You can only use your id, if you are not an admin

Response:

    status: 200
    body: message: "Данные успешно обновлены"

This route updates the userdata

<hr>
