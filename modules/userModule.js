const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add the name"],
        },
        email: {
            type: String,
            required: [true, "Please add the user email address"],
            unique: [true, "Email address already taken"],
        },
        password: {
            type: String,
            required: [true, "Please add the user password"],
        },
        phone: {
            type: String,
            required: [true, "Please add phone number"],
        },
        caption: {
            type: String,
            default: "Hello there",
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("users", userSchema);