// app.js
import express from "express";
import routes from "./index.js";
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors";
import passport from "passport";
// ensure passport strategies are registered
import "./config/passport.js";

app.use(cookieParser());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://viseverse.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use("/", routes);

export default app;
