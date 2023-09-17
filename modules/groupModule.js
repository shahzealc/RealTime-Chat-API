const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({

    user_id: [
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
    ],

    group_name: {
        type:String,
        required:[true,"Please add group name"]
    }

},
{
    timestamps: true,
}
);

// Create the Private model
module.exports = mongoose.model("Group", groupSchema);

