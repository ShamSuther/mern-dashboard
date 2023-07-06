// 
const express = require('express');
require("./config/config");
const cors = require("cors");
const User = require("./config/db/users");
const Product = require("./config/db/products");

const Jwt = require("jsonwebtoken");
const jwtKey = "com_dashboard";
const app = express();

// CORS => Cross-Origin Resource Sharing is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.

const verify = (req, resp, next) => {
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(" ")[1];
        Jwt.verify(token, jwtKey, (error, valid) => {
            if (error) {
                resp.status(401).send({ result: "Provide valid token" });
            } else {
                // resp.send(valid);
                next();
            }
        })
    } else {
        resp.status(403).send({ result: "Add token with Headers" });
    }
}

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    const postman = req.body;
    const userData = new User(postman);
    let result = await userData.save();
    result = result.toObject();
    delete result.password;
    delete result.__v;
    Jwt.sign({ result }, jwtKey, { expiresIn: "4h" },
        (error, token) => {
            if (error) {
                resp.send({ result: "Something went wrong, please try again later." })
            } else {
                resp.send({ result, auth: token });
            }
        }
    )
});

app.post("/login", async (req, resp) => {
    const postman = req.body;
    const user_data = await User.findOne(postman).select("-password -__v");
    if (user_data) {
        Jwt.sign({ user_data }, jwtKey, { expiresIn: "4h" },
            (error, token) => {
                if (error) {
                    resp.send({ result: "Something went wrong, please try again later." })
                } else {
                    resp.send({ user_data, auth: token });
                }
            }
        )
    } else {
        resp.send({ message: "No user found" });
    }
});

app.post("/add_product", verify, async (req, resp) => {
    const postman = req.body;
    const productData = new Product(postman);
    const result = await productData.save();
    resp.send(result);
})


app.get("/products", verify, async (req, resp) => {
    const products = await Product.find().select("-__v");
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No products found" });
    }
})

app.delete("/products/:id", verify, async (req, resp) => {
    const postman = req.params.id;
    const result = await Product.deleteOne({ _id: postman });
    resp.send(result);
})

app.get("/update/:id", verify, async (req, resp) => {
    const postman = req.params.id;
    const product = await Product.findOne({ _id: postman }).select("-__v");
    if (product) {
        resp.send(product);
    } else {
        resp.send({ result: "No Record Found." })
    }
})

app.put("/update/:id", verify, async (req, resp) => {
    const productId = req.params.id;
    const productData = req.body;
    const result = await Product.updateOne({ _id: productId }, { $set: productData });
    resp.send(result);
})

app.get("/search/:key", verify, async (req, resp) => {
    const searchKey = req.params.key;
    const result = await Product.find({
        "$or": [
            { name: { $regex: searchKey } },
            { brand: { $regex: searchKey } }
        ]
    });
    resp.send(result);

})

app.listen(5000);