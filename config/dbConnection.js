const mongoose = require("mongoose");
CONNECTION_STRING = "CONNECTION STRING OG MONGODB"

const connectDb = async() =>{

    try{
        const connect = await mongoose.connect(CONNECTION_STRING);
        console.log(connect.connection.host,connect.connection.name);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }

}

module.exports = connectDb;

