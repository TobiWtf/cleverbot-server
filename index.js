const express = require("express");
let args = process.argv.slice(2);
let port = Number(args[0]);
let server_key = args[1];
const app = new express();
app.use((require("body-parser")).json());
app.use(require("./middleware")(server_key))
const clients = {};
const cleverbot = require("cleverbot-api-free");

app.get(
    "/clients",
    async (req, res) => {
        let client_reponse = [];
        for (let index in clients) {
            client_reponse.push(index)
        };
        return res.send(
            {
                error: false,
                data: {
                    clients: client_reponse,
                },
            },
        );
    },
);

app.post(
    "/messages",
    async (req, res) => {
        let id = req.body.id, message = req.body.message;
        if (!id) {
            return res.send(
                {
                    error: true,
                    reason: "missing_id",
                    message: "please provide a client id...",
                },
            );
        } else if (!clients[id]) {
            return res.send(
                {
                    error: true,
                    reason: "invalid_id",
                    message: `there is no client with the id ${id}`,
                },
            );
        } else if (!message) {
            return res.send(
                {
                    error: true,
                    reason: "missing_message",
                    message: "please provide a message...",
                },
            );
        } else {
            let client = clients[id];
            client.send(
                message,
                async response => {
                    return res.send(
                        {
                            error: false,
                            data: {
                                message: response
                            },
                        },
                    );
                },
            );
        };
    },
);


app.put(
    "/clients",
    async (req, res) => {
        let id = req.body.id;
        if (!id) {
            return res.send(
                {
                    error: true,
                    reason: "missing_id",
                    message: "please provide a client id..."
                },
            );
        } else if (clients[id]) {
            return res.send(
                {
                    error: true,
                    reason: "taken",
                    message: "there is already a client with this id",
                },
            );
        } else {
            clients[id] = new cleverbot();
            return res.send(
                {
                    error: false,
                    data: {},
                },
            );
        };
    },
);

app.delete(
    "/clients",
    async (req, res) => {
        let id = req.body.id;
        if (!id) {
            return res.send(
                {
                    error: true,
                    reason: "missing_id",
                    message: "please provide a client id...",
                },
            );
        } else if (!clients[id]) {
            return res.send(
                {
                    error: true,
                    reason: "invalid_id",
                    message: `there are no clients with the id ${id}`,
                },
            );
        } else {
            delete clients[id];
            return res.send(
                {
                    error: false,
                    data: {}
                },
            );
        };
    },
);

app.listen(port);