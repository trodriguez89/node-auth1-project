const express = require("express");
const helmet = require("helmet")

const apiRouter = require("../auth/auth-router");
const userRouter = require("../users/user-router");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/auth", apiRouter);
server.use("/api/users", userRouter);

module.exports = server;

