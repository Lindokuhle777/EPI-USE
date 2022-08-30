import express from "express";
import cors from 'cors';
import Users from "./routes/Users.js";

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(express.json());
app.use(cors());

app.use("/Users",Users);



app.listen(PORT,()=>{
    console.log("listening on port",PORT);
})