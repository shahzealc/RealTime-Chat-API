const express = require("express");
const {getConversationList, createConversation, getMessages, createMessage} = require("../Controller/privateController");

const router = express.Router();

router.route("/").get(getConversationList).post(createConversation);
router.route("/:id").get(getMessages).post(createMessage);
router.route("/:id/message/:message").get(getMessages);
module.exports = router