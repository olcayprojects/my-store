import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import { useCart } from "./CartContext";
import { useSpring, animated } from "react-spring";

// Ana sayfa bileşeni
const Home = () => {
  const [products, setProducts] = useState([]); // Ürünleri saklamak için durum
  const [categories, setCategories] = useState([]); // Kategorileri saklamak için durum
  const [selectedCategory, setSelectedCategory] = useState("All"); // Seçili kategoriyi saklamak için durum
  const { addToCart, getTotalItems, getTotalPrice } = useCart(); // Sepet fonksiyonları

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data); // Ürünleri al ve duruma ata

        // Kategorileri elde etme
        const uniqueCategories = [
          "All",
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories); // Kategorileri duruma ata
      } catch (error) {
        console.error("Error fetching products:", error); // Hata durumunda konsola yazdır
      }
    };

    fetchProducts(); // Ürünleri getir
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Seçili kategoriyi güncelle
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
            {getTotalItems() &&
              getTotalPrice() > 0 &&
              ` (${getTotalItems()})=$${getTotalPrice()}`}
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
              } me-2 mb-2 text-uppercase`}
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
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

// Kart bileşeni
const ProductCard = ({ product, addToCart }) => {
  const [hovered, setHovered] = useState(false); // Kartın üzerine gelip gelinmediğini kontrol etmek için durum
  const props = useSpring({
    transform: hovered ? "scale(1)" : "scale(1.02)",
    borderRadius: hovered ? "20px" : "5px",
    boxShadow: hovered
      ? "0px 15px 25px rgba(0, 0, 0, 0.4)"
      : "0px 5px 10px rgba(0, 0, 0, 0.2)",
    config: { tension: 250, friction: 20 },
  });
  return (
    <div className="col-md-2 mb-3">
      <animated.div
        className="card h-100 bg-dark text-white"
        style={props} // Animasyon stilini uygula
        onMouseEnter={() => setHovered(true)} // Fare kartın üzerine geldiğinde durumu güncelle
        onMouseLeave={() => setHovered(false)} // Fare kartın üzerinden ayrıldığında durumu güncelle
      >
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
          <p className="card-text mt-2" style={{ fontSize: "0.875rem" }}>
            {product.description}
          </p>
          <button
            className="btn btn-outline-light mt-auto"
            onClick={() => addToCart(product)} // Ürünü sepete ekle
          >
            Add to Cart
          </button>
        </div>
      </animated.div>
    </div>
  );
};

export default Home;
