// Products collection
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    category: String,
    price: String,
    user_id: String,
})

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
