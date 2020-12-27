# Install

To install, open up your terminal and run

`sudo npm install -g cleverbot-server`

# Run

The run command is as follows:

`cleverbot-server <port> <serverkey[OPTIONAL]>`

Example: `cleverbot-server 8080 Password123`

Dont include <> or []

# Docs

# Get

`GET/clients`

returns a list of active client ids

Request body...
```json
{
    "key": "Your server key, only add if you set one on start"
}
```

# Post

`POST/messages`

Sends a message to cleverbot, and returns a response

Request body...
```json
{
    "key": "Your server key, only add if you set one on start",
    "message": "Message to cleverbot",
    "id": "clients id"
}
```

# Put

`PUT/clients`

adds a new client

Request body...
```json
{
    "key": "Your server key, only add if you set one on start",
    "id": "clients id"
}
```

# Delete

`DELETE/clients`

deletes a client

Request body...
```json
{
    "key": "Your server key, only add if you set one on start",
    "id": "clients id"
}
```

