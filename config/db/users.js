// Products collection
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email_address: String,
    password: String,
})
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
