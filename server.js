const express = require("express");
const connectDb = require("./config/dbConnection");
var session = require('express-session')
const app = express();
const min_15 = 900000;

connectDb();

app.use(express.json());

app.use(session({
    secret: "nothing",
    saveUninitialized:true,
    cookie: { maxAge: min_15 },
    resave: false 
}));

app.use("/api/auth/user",require("./Routes/userRoutes"));
app.use("/api/message/private",require("./Routes/privateRoutes"));
app.use("/api/message/group",require("./Routes/groupRoutes"));

const port = 5000 || 5001;

app.listen(port,()=>{
    console.log("Server Started");
})