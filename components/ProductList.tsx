"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <Card key={product.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">
              <Link href={`/products/${product.id}`} className="hover:underline">
                {product.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <Link href={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
            </Link>
            <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}