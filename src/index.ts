import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/usersRoute";
import roomsRouter from "./routes/roomRoutes";
import type { ConnectOptions } from "mongoose";
import AppErrorHandler from "./utils/AppErrorHandler";
import roomTypesRouter from "./routes/roomTypeRoutes";
import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();
const port = process.env.PORT || 8800;

//Global Middleware
app.use(cors()); // allow cross-origin request

app.use(express.json()); // Use JSON parser middleware
//middleware for updating data.
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

// Routes Middleware
app.use("/api/v1/users", userRouter);
app.use("/api/v1", roomTypesRouter);
app.use("/api/v1", roomsRouter);

//Wrong route error handler middleware
app.all("*", (err: Error, req: Request, res: Response, next: NextFunction) => {
  next(
    new AppErrorHandler(`Can't find ${req.originalUrl} on this Server!`, 404)
  );
  console.log(err.stack);
});

//Database Connection
const DB = `${process.env.DATABASE}`;
const options: ConnectOptions = {
  retryWrites: true,
  w: "majority",
};
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, options)
  .then(() => {
    console.log("DB connected successfully!");
  })
  .catch((error) => {
    console.log("Not connected to the database!!", error.stack);
  });

//Server Connection
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
