const { Schema, model } = require("mongoose");

const SignupSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String
})

const SignupModule = model("signup", SignupSchema);
module.exports = SignupModule;