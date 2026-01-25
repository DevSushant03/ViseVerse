// app.js
import express from "express";
import routes from "./index.js";
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors";


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["https://viseverse.netlify.app", "http://localhost:5173" ,"http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use("/", routes);

export default app;
