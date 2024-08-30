// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { CartProvider, useCart } from './CartContext';

// Ana sayfa bileşeni
const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart, getTotalItems } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);

        // Kategorileri elde etme
        const uniqueCategories = ['All', ...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
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
          <img src="https://via.placeholder.com/150x50/000000/FFFFFF?text=My+Store" alt="Logo" className="img-fluid" />
          <h1 className="mb-0">My Store</h1>
          <Link to="/cart" className="btn btn-outline-light">
            View Cart 
            {getTotalItems() > 0 && ` (${getTotalItems()})`} {/* Toplam ürün adedini göster */}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-fluid mt-5">
        <div className="d-flex flex-wrap mb-4">
          {categories.map(category => (
            <button
              key={category}
              className={`btn ${category === selectedCategory ? 'btn-dark' : 'btn-outline-secondary'} me-2 mb-2 text-uppercase`} // Koyu arka plan ve büyük harf
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="row">
          {products
            .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
            .map(product => (
              <div className="col-md-2 mb-3" key={product.id}> {/* Her satırda 6 ürün */}
                <div className="card h-100 bg-dark text-white">
                  <img 
                    src={product.image} 
                    className="card-img-top" 
                    alt={product.title} 
                    style={{ 
                      objectFit: 'contain', 
                      height: '200px', 
                      width: '100%', 
                      backgroundColor: 'white' 
                    }} 
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price.toFixed(2)}</p>
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
      </div>
    </div>
  );
};

// Sepet bileşeni
const Cart = () => {
  const { cart, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  return (
    <div className="bg-black text-white min-vh-100">
      <header className="sticky-top bg-dark text-white shadow-sm py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h1 className="mb-0">Your Cart</h1>
          <Link to="/" className="btn btn-outline-light">Back to Products</Link> {/* Ürünler Sayfasına Dön */}
        </div>
      </header>

      <div className="container-fluid mt-5">
        <div className="row">
          {Object.values(cart).length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <>
              <div className="col-12 mb-3">
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Total</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(cart).map(product => (
                      <tr key={product.id}>
                        <td>{product.title}</td>
                        <td>{product.quantity}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>${(product.quantity * product.price).toFixed(2)}</td>
                        <td>
                          <button 
                            className="btn btn-outline-light" 
                            onClick={() => removeFromCart(product.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3">Total Items</td>
                      <td>{getTotalItems()}</td>
                    </tr>
                    <tr>
                      <td colSpan="3">Total Price</td>
                      <td>${getTotalPrice()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Ana bileşen
const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
