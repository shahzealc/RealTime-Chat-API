const express = require("express");
const router = express.Router();
const {getGroupList, createGroup, getGroupMessages, createGroupMessage,addUser} = require("../Controller/groupController");

router.route("/").get(getGroupList).post(createGroup);
router.route("/search/:group").get(getGroupList);
router.route("/:id").get(getGroupMessages).post(createGroupMessage);
router.route("/:id/message/:message").get(getGroupMessages);
router.route("/adduser/:id").post(addUser);

module.exports = router