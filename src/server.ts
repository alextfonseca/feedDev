import express, { NextFunction, Request, Response } from "express";
import { router } from "./app";

const app = express();
app.use(express.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  },
);

app.listen(3333);


// import http from 'http'
// import app from './app'
// import dotenv from 'dotenv'
// dotenv.config()

// const server = http.createServer(app)

// const port = process.env.PORT || 3001

// server.listen(port, () => {
//   console.log(`Server running on port: ${port}!`)
// })
