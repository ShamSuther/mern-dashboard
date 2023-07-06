import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

const Update = () => {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();
    const params = useParams();
    const productId = params.id;
    const token = localStorage.getItem("token");


    const getProduct = async () => {
        const fetchData = await fetch(`http://localhost:5000/update/${productId}`, {
            headers: {
                Authorization: `bearer ${JSON.parse(token)}`
            }
        })
        const result = await fetchData.json();
        if (result) {
            // console.log(result);
            setName(result.name);
            setBrand(result.brand);
            setCategory(result.category);
            setPrice(result.price);
        } else {
            alert("No Record Found");
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user._id;

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
                name: name,
                brand: brand,
                category: category,
                price: price,
                user_id: user_id,
            }
            let result = await fetch(`http://localhost:5000/update/${productId}`, {
                method: "put",
                body: JSON.stringify(productData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${JSON.parse(token)}`
                }
            });
            result = await result.json();
            if (result) {
                alert("Product Updated");
                navigate("/");
            } else {
                alert("Update Failed!");
            }
        }
    }

    return (
        <div className="ui">
            <div className='register'>
                <div className="in">
                    <h1>Update</h1>
                    <p>Update your old product</p>
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
                    <button className='button' onClick={collectData}>Update product</button>
                </div>
            </div>
        </div>
    )
}

export default Update;
