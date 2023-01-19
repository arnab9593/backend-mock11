const express = require("express");
const argon2 = require("argon2");

const SignupSchema = require("./user.model");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        const hash = await argon2.hash(password);
        console.log(hash);
        let existUser = await SignupSchema.findOne({ email });
        if (existUser) {
            return res.send({ msg: "email already exists" });
        }

        const user = new SignupSchema({ email, password: hash });
        await user.save();
        res.send({ msg: "signup done" });

    } catch (e) {
        res.send(e.message);
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await SignupSchema.findOne({ email });
        if (user) {
            let checkEmail = user.email;
            if (checkEmail == email) {
                const token = jwt.sign({ userID: user._id }, "hash");
                res.send({ msg: "login done", token: token });
            } else {
                res.send({ msg: "incorrect password" });
            }
        } else {
            res.send({ msg: "email not found" });
        }
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = userRouter