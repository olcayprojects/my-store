import React, { createContext, useState, useContext } from 'react';

// Sepet bağlamını oluştur
const CartContext = createContext();

// Sepet sağlayıcısını oluştur
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({}); // Ürün ID'leri ve adetleri

  // Sepete ürün ekleme işlevi
  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[product.id]) {
        updatedCart[product.id].quantity += 1;
      } else {
        updatedCart[product.id] = { ...product, quantity: 1 };
      }
      return updatedCart;
    });
  };

  // Sepetten ürün çıkarma işlevi
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const { [productId]: _, ...rest } = prevCart;
      return rest;
    });
  };

  // Sepetteki toplam ürün sayısını hesaplama işlevi
  const getTotalItems = () => {
    return Object.values(cart).reduce((total, product) => total + product.quantity, 0);
  };

  // Sepetteki toplam fiyatı hesaplama işlevi
  const getTotalPrice = () => {
    return Object.values(cart).reduce((total, product) => total + product.quantity * product.price, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Bağlamı kullanma işlevi
export const useCart = () => useContext(CartContext);
