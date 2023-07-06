const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const db = "e-commerce";
const password = "bQGu01psp9zmntGU";
const url_name = `mongodb+srv://shamsuther:${password}@cluster0.ivsafco.mongodb.net/${db}?retryWrites=true&w=majority`;

// for localhost
// const url_name = `mongodb://127.0.0.1:27017/${db}`

mongoose.connect(url_name);