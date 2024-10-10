"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckoutFormData } from '@/components/CheckoutForm';

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  date: string;
  customerInfo?: CheckoutFormData;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map(order => (
          <Card key={order.id} className="mb-4">
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
              <p className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</p>
            </CardHeader>
            <CardContent>
              {order.customerInfo ? (
                <>
                  <h3 className="font-semibold mb-2">Customer Information:</h3>
                  <p>Name: {order.customerInfo.name}</p>
                  <p>Email: {order.customerInfo.email}</p>
                  <p>Address: {order.customerInfo.address}</p>
                  <p>City: {order.customerInfo.city}</p>
                  <p>Country: {order.customerInfo.country}</p>
                  <p>Postal Code: {order.customerInfo.postalCode}</p>
                </>
              ) : (
                <p>Customer information not available for this order.</p>
              )}
              
              <h3 className="font-semibold mt-4 mb-2">Order Items:</h3>
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.title} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <strong>Total: ${order.total.toFixed(2)}</strong>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}