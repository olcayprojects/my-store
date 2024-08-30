import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

// Sepet bileşeni
const Cart = () => {
  const { cart, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  return (
    <div className="bg-dark text-white min-vh-100">
      <header className="sticky-top bg-dark text-white shadow-sm py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h1 className="mb-0">Your Cart</h1>
          <Link to="/" className="btn btn-outline-light">
            Back to Products
          </Link>
        </div>
      </header>

      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-8">
            {Object.values(cart).length === 0 ? (
              <p className="text-center">Your cart is empty.</p>
            ) : (
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
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />{" "}
                        {product.title}
                      </td>
                      <td>{product.quantity}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>
                        ${(product.quantity * product.price).toFixed(2)}
                      </td>
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
            )}
          </div>

          {/* Sağ sütun için toplam özet */}
          <div className="col-md-4 d-flex justify-content-end">
            <div className="card bg-dark text-white border-light" style={{ width: "250px" }}>
              <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
