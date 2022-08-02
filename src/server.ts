import express from "express";
import { router } from "./app";
import dotenv from "dotenv";

const server = express();
dotenv.config();

server.use(express.json());

server.use(router);

const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log(`Server running on port: ${port}!`);
});
