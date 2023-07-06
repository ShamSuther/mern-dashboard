import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../App.css";

const Add = () => {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user._id;
    const token = localStorage.getItem("token");

    const collectData = async () => {
        if (!name) {
            alert("Enter product name");
        } else if (!brand) {
            alert("Enter product brand");
        } else if (!category) {
            alert("Enter product category");
        } else if (!price) {
            alert("Enter product price");
        } else {
            const productData = {
                name: name.toLowerCase(),
                brand: brand.toLowerCase(),
                category: category.toLowerCase(),
                price: price,
                user_id: user_id,
            }
            // 
            const api_data = await fetch("http://localhost:5000/add_product", {
                method: "post",
                body: JSON.stringify(productData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${JSON.parse(token)}`
                }
            })
            const result = await api_data.json();
            if (result) {
                alert("Product Added");
                setName("");
                setBrand("");
                setCategory("");
                setPrice("");
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            } else {
                alert("Couldn't add product");
            }
        }
    }

    return (
        <div className="ui">
            <div className='register'>
                <div className="in">
                    <h1>Add</h1>
                    <p>Add your new product</p>
                </div>
                <div className="content">
                    <input className='input product'
                        placeholder='product name'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input className='input product'
                        placeholder='product brand'
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />

                    <input className='input product'
                        placeholder='category : mobile, tablet, ...'
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <input className='input product'
                        placeholder='product price'
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="sub_pro">
                    <button className='button' onClick={collectData}>Add product</button>
                </div>
            </div>
        </div>
    )
}

export default Add;
