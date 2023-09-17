const mongoose = require("mongoose");

const groupMessagesSchema = new mongoose.Schema({
    // Id field is automatically generated by MongoDB
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group", // Reference to the "group" model
    },
    user_send: {
        type: String,
        ref: "User", // Reference to the "User" model
    },
    message: {
        type: String,
        required: true,
    },
    reply_to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "groupMessage",
        required:false,
    },
    reply_message_to:{
        type: String,
        required: false,
    }
},
    {
        timestamps: true,
    }
);

// Create the group model
module.exports =  mongoose.model("groupMessage", groupMessagesSchema);

