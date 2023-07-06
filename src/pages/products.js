import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiTrashAlt } from 'react-icons/bi';
import { RxUpdate } from 'react-icons/rx';
import "../App.css";

const Products = () => {
  const auth = localStorage.getItem("user");
  const user = JSON.parse(auth);

  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => { getProducts() }, []);

  const getProducts = async () => {
    let results = await fetch("http://localhost:5000/products", {
      headers: {
        Authorization: `bearer ${JSON.parse(token)}`
      }
    });
    results = await results.json();
    if (results) {
      setProducts(results);
    } else {
      console.log("Couldn't fetch data")
    }
  }

  const deleteProduct = async (items) => {
    const product_user = items.user_id;
    const product_uid = items._id;

    if (user._id === product_user) {
      const fetchData = await fetch(`http://localhost:5000/products/${product_uid}`, {
        method: "delete",
        headers: {
          Authorization: `bearer ${JSON.parse(token)}`
        }
      })
      const result = await fetchData.json();
      if (result) {
        alert("Product Removed");
        getProducts();
      } else {
        alert(`Couldn't remove this product: ${items.name}`)
      }
    } else {
      alert("You are not authorized to delete this product.")
    }
  }

  const search = async (e) => {
    const searchKey = e.target.value;
    if (searchKey) {
      let data = await fetch(`http://localhost:5000/search/${searchKey}`, {
        headers: {
          Authorization: `bearer ${JSON.parse(token)}`
        }
      });
      data = await data.json();
      if (data) {
        setProducts(data);
      }
    } else {
      getProducts();
    }
  }

  return (
    <div className='ui container'>
      <section className="table">
        <div className="title">
          <h1>Products</h1>
        </div>
        <div className="searchBox">
          <input className="input" type="text" placeholder="Search product" onChange={search} />
        </div>
        <div className="tbody">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {
                products.length > 0 ? products.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      <td>{item.category}</td>
                      <td>{`$${item.price}`}</td>
                      <td>
                        <div>
                          <button className="btn" onClick={() => deleteProduct(item)}>
                            <BiTrashAlt className="icon" />
                          </button>
                          <Link to={`/update/${item._id}`}>
                            <button className="btn">
                              <RxUpdate className="icon" />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                }) :
                  (
                    <tr>
                      <td colSpan={6}>
                        <h1>No Record Found</h1>
                      </td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}

export default Products;
