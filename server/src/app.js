// app.js
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
const app = express();

app.use(cors({
  origin: "https://viseverse.netlify.app", // your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use("/", routes);

export default app;
