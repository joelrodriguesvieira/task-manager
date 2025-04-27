import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./config/database.js";

const main = async () => {
  config();

  const app = express();

  const PORT = process.env.PORT || 3001;

  await MongoClient.connect();

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
};

main();
