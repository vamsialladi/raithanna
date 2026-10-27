import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const INITIAL_CART = [
  {
    id: 'prod-1',
    name: 'Tomato',
    quantity: 5,
    unit: 'kg',
    price: 32,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&auto=format&fit=crop&q=80',
    stock: 250,
    farmerName: 'Ramesh Reddy'
  },
  {
    id: 'prod-2',
    name: 'Green Chilli',
    quantity: 2,
    unit: 'kg',
    price: 48,
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=300&auto=format&fit=crop&q=80',
    stock: 140,
    farmerName: 'Lakshmi Devi'
  },
  {
    id: 'prod-3',
    name: 'Onion',
    quantity: 5,
    unit: 'kg',
    price: 28,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&auto=format&fit=crop&q=80',
    stock: 400,
    farmerName: 'Ravi Teja'
  }
];

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('rythu_cart');
    return saved ? JSON.parse(saved) : INITIAL_CART;
  });

  const [coupon, setCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem('rythu_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock || 999);
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            quantity: quantity,
            unit: product.unit || 'kg',
            price: product.price,
            image: product.image,
            stock: product.stock || 100,
            farmerName: product.farmerName || 'Local Farmer'
          }
        ];
      }
    });
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            if (item.stock && nextQty > item.stock) return item;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
    setDiscountAmount(0);
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'RYTHU50') {
      setCoupon('RYTHU50');
      setDiscountAmount(50);
      return { success: true, message: '₹50 discount applied!' };
    }
    if (clean === 'FARMER10') {
      const disc = Math.round(subtotal * 0.1);
      setCoupon('FARMER10');
      setDiscountAmount(disc);
      return { success: true, message: '10% discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try RYTHU50 or FARMER10' };
  };

  const removeCoupon = () => {
    setCoupon(null);
    setDiscountAmount(0);
  };

  const totalItemsCount = cartItems.length;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        subtotal,
        deliveryFee,
        discountAmount,
        grandTotal,
        coupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
