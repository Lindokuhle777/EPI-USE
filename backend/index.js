import express from "express";
import cors from "cors";
import Users from "./routes/Users.js";
import Employees from "./routes/Employees.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "../client/build")));
}

app.use("/Users", Users);
app.use("/Employees", Employees);

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
