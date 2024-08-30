import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS

// Sepet bileşeni
const Cart = () => {
  const { cart, removeFromCart, addToCart, decrementQuantity, getTotalItems, getTotalPrice } = useCart();

  return (
    <div className="bg-black text-white min-vh-100">
      <header className="sticky-top bg-dark text-white shadow-sm py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h1 className="mb-0">Your Cart</h1>
          <Link to="/" className="btn btn-outline-light">
            Back to Products
          </Link>{" "}
          {/* Ürünler Sayfasına Dön */}
        </div>
      </header>

      <div className="container-fluid mt-5">
        <div className="row">
          {Object.values(cart).length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <div className="col-12">
              <div className="row">
                {/* Sepetteki ürünler */}
                <div className="col-md-8">
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
                      {Object.values(cart).map((product) => (
                        <tr key={product.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={product.image}
                                alt={product.title}
                                style={{ width: "50px", height: "auto", marginRight: "10px" }}
                              />
                              {product.title}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <button
                                className="btn btn-outline-light btn-sm me-2"
                                onClick={() => addToCart(product)}
                                disabled={product.quantity >= 10} // Maksimum sınır
                              >
                                +
                              </button>
                              {product.quantity}
                              <button
                                className="btn btn-outline-light btn-sm ms-2"
                                onClick={() => decrementQuantity(product.id)} // Miktarı azalt
                              >
                                -
                              </button>
                            </div>
                          </td>
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
                    </tbody>
                  </table>
                </div>
                {/* Sepet toplamı */}
                <div className="col-md-4 d-flex flex-column align-items-end">
                  <div className="card bg-dark text-light w-100">
                    <div className="card-body">
                      <h5 className="card-title">Summary</h5>
                      <p className="card-text">
                        <strong style={{ fontSize: "1.5rem" }}>Total Items: </strong>
                        <span style={{ fontSize: "1.25rem" }}>{getTotalItems()}</span>
                      </p>
                      <p className="card-text">
                        <strong style={{ fontSize: "1.5rem" }}>Total Price: </strong>
                        <span style={{ fontSize: "1.25rem" }}>${getTotalPrice()}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
