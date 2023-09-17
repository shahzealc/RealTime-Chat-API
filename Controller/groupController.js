const User = require("../modules/userModule");
const Group = require("../modules/groupModule");
const GroupMessages = require("../modules/groupMessageModule");
const asyncHandler = require("express-async-handler");


const getGroupList = asyncHandler(async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(403).json({ message: "Login First" });
            return;
        }
        const userid = req.session.userId;
        var groups;
        if (req.params.group) {
            groups = await Group.find({ user_id: userid, group_name: { $regex: new RegExp(req.params.group, 'i') } });
        }
        else {
            groups = await Group.find({ user_id: userid });
        }
        res.status(200).json(groups);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
});


const createGroup = asyncHandler(async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(403).json({ message: "Login First" });
            return;
        }
        const userid = [req.session.userId];
        const name1 = await User.findOne({ _id: req.session.userId });
        const names = [name1.username];

        if (!req.body.email || !req.body.group_name) {
            res.status(400).json({ message: "Email and GroupName are required fields" });
            return;
        }

        for (const email of req.body.email) {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: `User with email ${email} not found` });
            }

            userid.push(user._id);
            names.push(user.username);
        }

        const group = await Group.create({
            user_id: userid,
            name: names,
            group_name: req.body.group_name
        })

        res.status(200).json(group);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const getGroupMessages = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    try {
        if (!req.session.userId) {
            res.status(403).json({ message: "Login First" });
            return;
        }
        const groupId = req.params.id;
        var groupMessage;
        if (req.params.message) {
            console.log(req.params.message);
            groupMessage = await GroupMessages.find({ group_id: groupId, message: { $regex: new RegExp(req.params.message, 'i') } });
        }
        else {
            groupMessage = await GroupMessages.find({ group_id: groupId });
        }
        // const groupMessage = await GroupMessages.find({group_id:groupId});
        // console.log(groupMessage);
        if (!groupMessage) {
            res.status(403).json({ message: "Group not found" });
            return;
        }
        res.status(200).json(groupMessage);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const createGroupMessage = asyncHandler(async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(403).json({ message: "Login First" });
            return;
        }
        const groupId = req.params.id;
        const userSend = (await User.findOne({ _id: req.session.userId })).username;
        const message = req.body.message;

        if (!message || !groupId || !userSend) {
            res.status(400).json({ message: "Message and GroupId are required fields" });
            return;
        }

        var groupMessage;

        if(!req.body.reply_id){
            groupMessage = await GroupMessages.create({
                group_id: groupId,
                user_send: userSend,
                message: message
            })
        }
        else{

            const replyToMessage = await GroupMessages.findById(req.body.reply_id);

            groupMessage = await GroupMessages.create({
                group_id: groupId,
                user_send: userSend,
                message: message,
                reply_to:req.body.reply_id,
                reply_message_to:replyToMessage.message
            })
        }
        
        res.status(200).json(groupMessage);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const addUser = asyncHandler(async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(403).json({ message: "Login First" });
            return;
        }
        const groupId = req.params.id;
        const userAdd = await User.findOne({ email: req.body.email });

        if (!userAdd) {
            res.status(404).json({ message: `${req.body.email} user not found` })
            return;
        }

        const groupMessage = await Group.findOne({
            _id: groupId,
        })

        if (!groupMessage) {
            res.status(404).json({ message: `Group not found` })
            return;
        }

        groupMessage.user_id.push(userAdd._id);
        groupMessage.name.push(userAdd.username);
        await groupMessage.save();
        res.status(200).json(groupMessage);

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = { getGroupList, createGroup, getGroupMessages, createGroupMessage, addUser };