const User = require("../modules/userModule");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const loginUser = asyncHandler(async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Email and Password are required" });
            return;
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ message: "Email is not registered" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }

        req.session.userId = user._id.toString();

        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { username, email, password, phone, caption } = req.body;

        if (!username || !email || !password || !phone) {
            res.status(400).json({ message: "Username, Email, Password, and Phone are required fields" });
            return;
        }

        const userAvailable = await User.findOne({ email });

        if (userAvailable) {
            res.status(400).json({ message: "User already registered!" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            phone,
            caption: caption || "Hello there", // Default caption if not provided
        });

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const logoutUser = asyncHandler(async (req, res) => {
    if (req.session.userId == "null") {
        res.status(400).json({ message: "Not Logged In" });

    } else {
        req.session.userId = "null";
        res.json({ message: "Logged Out" });
    }
});

const updateUser = asyncHandler(async (req, res) => {

    try{
        if (req.session.userId == "null") {
            res.status(400).json({ message: "Not Logged In" });
            return;
        }

        const { username, email, password, phone, caption } = req.body;
        const userAvailable = await User.findOne({ email });

        if (!userAvailable) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        if(userAvailable._id!=req.sessionID.userId){
            res.status(403).json({message:"Not authorized to change user detail"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        req.body.password = hashedPassword;

        const updatedUser = await User.findByIdAndUpdate(
            userAvailable._id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedUser);

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server error"});
    }
        
        
});


module.exports = { loginUser, registerUser, logoutUser, updateUser };