import express from "express";
import cors from "cors";

import patients from "./data/patients";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/patients", (_req, res) => {
  res.json(patients);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
