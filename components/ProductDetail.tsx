"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item: any) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Product added to cart!');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="flex flex-col md:flex-row">
        <CardContent className="md:w-1/2">
          <img src={product.image} alt={product.title} className="w-full h-auto object-contain" />
        </CardContent>
        <div className="md:w-1/2 p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{product.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            <p className="mb-4">{product.description}</p>
            <p className="text-sm text-gray-600">Category: {product.category}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}