# One Line a Day Back End (JWTs)

#### Endpoints

| Method | Endpoint      | Description                                                                   | body                  |
| ------ | ------------- | ----------------------------------------------------------------------------- | --------------------- |
| POST   | /api/register | Creates a `user` using the information sent inside the `body` of the request. | { "username": "user", "password": "pass", "firstname": "first", "lastname": "last" } |
| POST   | /api/login | Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client.| {"username": "user","password": "pass"} |
| GET    | /api/users | If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the err code. | --- |
| GET    | /api/users/userID | If the user is logged in, and is the correct user, respond with an object with the user user info. If the user is not logged in repond with the err code. | --- |
| DELETE | /api/users/userID | If the user is logged in, and is the correct user, responds with an empty object. If the user is not logged-in or does not contain the entry respond with the err code. | --- |
| PUT    | /api/users/userID | If the user is logged in, and is the correct user responds with an object with the users entry. If the user is not logged-in or does not contain the entry respond with the err code. | { "username": "username","password": "pass","firstname": "first", "lastname": "last" } |
| GET    | /api/users/userID/entries | If the user is logged in, is the correct user, respond with a list of the users entries. If the user is not logged in repond with the err code. | --- |
| POST   | /api/users/userID/entries | If the user is logged in, is the correct user, respond with an id of the new entry. If the user is not logged in repond with the err code. |{ "entry": "entry", "user_id": "id" }|
| GET    | /api/users/userID/entries/entryID | If the user is logged in, is the correct user, and contains the entry, responds with an object with the users entry. If the user is not logged-in or does not contain the entry respond with the err code. | --- |
| DELETE | /api/users/userID/entries/entryID | If the user is logged in, is the correct user, and contains the entry, responds with an empty object. If the user is not logged-in or does not contain the entry respond with the err code. | --- |
| PUT    | /api/users/userID/entries/entryID | If the user is logged in, is the correct user, and contains the entry, responds with an object with the users entry. If the user is not logged-in or does not contain the entry respond with the err code. | { "entry": "entry", "user_id": "id" } |
