const express = require("express");
const helmet = require("helmet")
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const dbConnection = require("../data/dbConfig");


const apiRouter = require("../auth/auth-router");
const userRouter = require("../users/user-router");

const server = express();

const sessionConfig = {
    name: "afternoonProject",
    secret: process.env.SESSION_SECRET || "secret secrets are no fun",
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: dbConnection,
        table: "sessions",
        sidfieldname: "sid",
        createTable: true,
        clearInterval: 60000
    })
};

server.use(helmet());
server.use(session(sessionConfig));
server.use(express.json());
server.use(cors());

server.use("/api/auth", apiRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
    res.json({ message: "API Running!"})
});

module.exports = server;

