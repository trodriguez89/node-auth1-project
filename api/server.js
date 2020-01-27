const express = require("express");
const helmet = require("helmet")

const apiRouter = require("../auth/auth-router");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/auth", apiRouter);

module.exports = server;

