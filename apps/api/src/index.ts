import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDatabase } from "./config/database.js";
import { taskRoutes } from "./routes/tasks/task.routes.js";

config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors())

app.use("/tasks", taskRoutes);

try {
  await connectDatabase();
} catch (error) {
  console.error(error);
}

app.get("/", (req, res) => {
  console.log("Test route hit");
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
