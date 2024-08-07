const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

//sign-up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        //check if username lenght is more than 3
        if (username.length <= 3) {
            return res.status(400).json({ message: "Username length should be greater than 3" });
        }

        //check if username already exists
        const exisitingUser = await User.findOne({username: username});
        if (exisitingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        //check if email already exists
        const existingEmail = await User.findOne({email: email});
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exisits" });
        }

        //check if password lenght is more than 5
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password length should be greater than 5" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        // create new user
        const newUser = new User({username: username, email: email, password: hashPass, address: address});
        await newUser.save();
        return res.status(200).json({ message: "Signup successful! "});

    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" });
    }
})

//sign-in
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        //check if username already exists
        const exisitingUser = await User.findOne({username});
        if (!exisitingUser) {
            return res.status(400).json({ message: "Invalid user" });
        }

        await bcrypt.compare(password, exisitingUser.password, (err, data) => {
            if(data){
                const authClaims = [{username: exisitingUser.username, role: exisitingUser.role }]
                const token = jwt.sign({ authClaims }, "bookstore123", { expiresIn: "30d"});
                res.status(200).json({ id: exisitingUser._id, role: exisitingUser.role, token: token });
            } else{
                res.status(400).json({ message: "Invalid credentials" });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" });
    }
})

//get-user-information
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    }catch {
        return res.status(500).json({ message: "Internal Server error" });
    }
})

//update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address: address });
        return res.status(200).json({ message: "Address updated successfully!"});
    }catch {
        return res.status(500).json({ message: "Internal Server error" });
    }
})

module.exports = router;