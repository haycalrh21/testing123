"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import CheckoutForm, { CheckoutFormData } from '@/components/CheckoutForm';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = (formData: CheckoutFormData) => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: getTotalPrice(),
      date: new Date().toISOString(),
      customerInfo: formData,
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');
    setCartItems([]);
    setIsCheckingOut(false);
    alert('Order placed successfully!');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty. <Link href="/products" className="text-blue-500 hover:underline">Continue shopping</Link></p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.map(item => (
        <Card key={item.id} className="mb-4">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-contain mr-4" />
            <div>
              <p>${item.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <Button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                <span className="mx-2">{item.quantity}</span>
                <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <CardFooter className="flex justify-between items-center mt-4">
        <p className="text-xl font-bold">Total: ${getTotalPrice().toFixed(2)}</p>
        {!isCheckingOut && (
          <Button onClick={() => setIsCheckingOut(true)}>Proceed to Checkout</Button>
        )}
      </CardFooter>
      {isCheckingOut && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <CheckoutForm onSubmit={handleCheckout} />
        </div>
      )}
    </div>
  );
}