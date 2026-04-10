'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '@/data/menu';

export interface CartItem {
  cartId: string; // Unique ID for the cart entry (since same item might have different extras)
  item: MenuItem;
  quantity: number;
  extras: { name: string; price: number }[];
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, quantity: number, extras: { name: string; price: number }[]) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem, quantity: number, extras: { name: string; price: number }[]) => {
    const newItem: CartItem = {
      cartId: Math.random().toString(36).substr(2, 9),
      item,
      quantity,
      extras
    };
    setCartItems(prev => [...prev, newItem]);
  };

  const removeFromCart = (cartId: string) => {
    setCartItems(prev => prev.filter(i => i.cartId !== cartId));
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  
  const totalPrice = cartItems.reduce((acc, curr) => {
    const itemTotal = (curr.item.price || 0) * curr.quantity;
    const extrasTotal = curr.extras.reduce((sum, extra) => sum + extra.price, 0) * curr.quantity;
    return acc + itemTotal + extrasTotal;
  }, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
