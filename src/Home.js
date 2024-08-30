import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import { useCart } from "./CartContext";

// Ana sayfa bileşeni
const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart, getTotalItems, getTotalPrice } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);

        // Kategorileri elde etme
        const uniqueCategories = [
          "All",
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-black text-white min-vh-100">
      {/* Sticky Header */}
      <header className="sticky-top bg-dark text-white shadow-sm py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <img
            src="https://via.placeholder.com/150x50/000000/FFFFFF?text=My+Store"
            alt="Logo"
            className="img-fluid"
          />
          <h1 className="mb-0">My Store</h1>
          <Link to="/cart" className="btn btn-outline-light">
            View Cart
            {getTotalItems() > 0 && ` (${getTotalItems()})`}{" "}
            {/* Toplam ürün adedini göster */}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-fluid mt-5">
        <div className="d-flex flex-wrap mb-4 justify-content-center">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn ${
                category === selectedCategory
                  ? "btn-dark"
                  : "btn-outline-secondary"
              } me-2 mb-2 text-uppercase`} // Koyu arka plan ve büyük harf
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="row justify-content-center">
          {products
            .filter(
              (product) =>
                selectedCategory === "All" ||
                product.category === selectedCategory
            )
            .map((product) => (
              <div className="col-md-3 mb-3" key={product.id}>
                {" "}
                {/* Her satırda 6 ürün */}
                <div className="card h-100 bg-dark text-white">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    style={{
                      objectFit: "contain",
                      height: "200px",
                      width: "100%",
                      backgroundColor: "white",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price.toFixed(2)}</p>
                    {/* Ürün açıklaması */}
                    <p
                      className="card-text mt-2"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {product.description}
                    </p>
                    <button
                      className="btn btn-outline-light mt-auto"
                      onClick={() => addToCart(product)} // Ürünü sepete ekle
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Açıklama ve toplamlar */}
        <div className="row mt-4">
          <div className="col-md-12 d-flex justify-content-center">
            <div
              className="card bg-dark text-white border-light"
              style={{ width: "300px" }}
            >
              <div className="card-body">
                <h5 className="card-title">Product Overview</h5>
                <p className="card-text">
                  <strong style={{ fontSize: "1.25rem" }}>Total Items:</strong>{" "}
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {getTotalItems()}
                  </span>
                </p>
                <p className="card-text">
                  <strong style={{ fontSize: "1.25rem" }}>Total Price:</strong>{" "}
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    ${getTotalPrice()}
                  </span>
                </p>
                <p className="card-text mt-3">
                  <small>
                    Summary of the total number of products and their total
                    cost.
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
