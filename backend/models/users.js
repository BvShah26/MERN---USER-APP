const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number

})

const userModel = mongoose.model("user", userSchema, "user"); // To Avoid extra s
module.exports = userModel;