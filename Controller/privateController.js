const User = require("../modules/userModule");
const Private = require("../modules/privateModule");
const PrivateMessage = require("../modules/privateMessageModule");
const asyncHandler = require("express-async-handler");

const getConversationList = asyncHandler(async (req, res) => {

    try {
        if (!req.session.userId) {
            res.status(403).json({ message: "Login First" });
            return;
        }
        const userid = req.session.userId;
        const conversations = await Private.find({ user_id: userid });
        res.status(200).json(conversations);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
});


const createConversation = asyncHandler(async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(403).json({ message: "Login First" });
            return;
        }
        const user1 = await User.findOne({ _id: req.session.userId });
        const user2 = await User.findOne({ email: req.body.email });

        if (!user2) {
            res.status(403).json({ message: "Email id doesn't exist" });
            return;
        }

        const conversation = await Private.create({
            user_id: [user1._id, user2._id],
            name: [user1.username, user2.username]
        })

        res.status(200).json(conversation);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

});


const getMessages = asyncHandler(async (req, res) => {
    try{
        if (!req.session.userId) {
            res.status(403).json({ message: "Login First" });
            return;
        }
        const privateId = req.params.id;
        var messages;
        if(req.params.message){
            messages = await PrivateMessage.find({private_id:privateId,message:{ $regex: new RegExp(req.params.message, 'i')} });
        }
        else{
            messages = await PrivateMessage.find({ private_id: privateId });
        }
        if(!messages){
            res.status(403).json({ message: "Private chat not found" });
            return;
        }
        res.status(200).json(messages);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
});


const createMessage = asyncHandler(async (req, res) => {

    try {
        if (!req.session.userId) {
            res.status(403).json({ message: "Login First" });
            return;
        }
        const privateId = req.params.id;
        const userSend = (await User.findOne({ _id: req.session.userId })).username;
        const message = req.body.message;


        if (!message || !privateId) {
            res.status(400).json({ message: "Message and PrivateId are required fields" });
            return;
        }

        var messageConversation;

        if(!req.body.reply_id){
            messageConversation = await PrivateMessage.create({
                private_id: privateId,
                user_send: userSend,
                message: message
            })
        }
        else{

            const replyToMessage = await PrivateMessage.findById(req.body.reply_id);

            messageConversation = await PrivateMessage.create({
                private_id: privateId,
                user_send: userSend,
                message: message,
                reply_to:req.body.reply_id,
                reply_message_to:replyToMessage.message
            })
        }


        res.status(200).json(messageConversation);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

});

module.exports = { getConversationList, createConversation, getMessages, createMessage };