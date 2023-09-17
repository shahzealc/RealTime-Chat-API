const mongoose = require("mongoose");
CONNECTION_STRING = "mongodb+srv://zealshah:adminzealshah@cluster0.jq5dvbl.mongodb.net/realtimechatting?retryWrites=true&w=majority"

const connectDb = async() =>{

    try{
        const connect = await mongoose.connect(CONNECTION_STRING);
        console.log("Hello from dbConnection")
        console.log(connect.connection.host,connect.connection.name);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }

}

module.exports = connectDb;

