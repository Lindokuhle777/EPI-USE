import express from "express";
import cors from 'cors';
import Users from "./routes/Users.js";
import Employees from "./routes/Employees.js";

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"))
  }

app.use("/Users",Users);
app.use("/Employees",Employees);



app.listen(PORT,()=>{
    console.log("listening on port",PORT);
})