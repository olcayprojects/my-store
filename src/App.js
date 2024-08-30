import React from "react";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./CartContext";
import Home from "./Home";
import Cart from "./Cart";

// Ana bileşen
const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
