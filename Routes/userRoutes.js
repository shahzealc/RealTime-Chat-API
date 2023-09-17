const express = require("express");
const router = express.Router();
const {loginUser,registerUser,logoutUser,updateUser} = require("../Controller/userController");

router.route("/").put(updateUser);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").get(logoutUser);



module.exports = router;