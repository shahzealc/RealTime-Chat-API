const mongoose = require("mongoose");

const privateSchema = new mongoose.Schema({

    user_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    name: [
        {
            type: String,
            ref: "User",
        },
        {
            type: String,
            ref: "User",
        },
    ],
},
{
    timestamps: true,
}
);

// Create the Private model
module.exports = mongoose.model("Private", privateSchema);

