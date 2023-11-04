import express, { urlencoded, json } from "express";
import http from "http";
import { Server } from "socket.io";

import * as authModule from './src/auth/auth.js';

const app = express();
const PORT = 8000;

app.use(urlencoded({ extended: true }));
app.use(json());

//👇🏻 New imports
const httpServer = http.Server(app);
import cors from "cors";

app.use(cors());

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    console.log(`${socket.id} connected.`);

    socket.on('disconnect', () => {
        socket.disconnect();
        console.log(`${socket.id} disconnected.`);
    });
});

app.get("/", (req, res) => {
    res.json({
        message: "Check",
    });
});

app.post("/signup", (req, res) => {
    console.log("here");
    authModule.signup(req, res);
})

app.get("/login", (req, res) => {
    authModule.login(req, res);
})

httpServer.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
