const mongoose = require("mongoose");
require('dotenv').config({ path: [".env", ".env.local"] });

mongoose.set("strictQuery", true);

const uri = `mongodb+srv://${process.env.CLUSTER_USERNAME}:${process.env.CLUSTER_PASSWORD}@cluster0.bnhhp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// for localhost
// const url_name = `mongodb://127.0.0.1:27017/${db}`

mongoose.connect(uri);