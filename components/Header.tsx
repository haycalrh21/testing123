"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((total: number, item: any) => total + item.quantity, 0);
      setCartItemCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            NextJS E-commerce
          </Link>
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <li><Link href="/" onClick={toggleMenu}>Home</Link></li>
              <li><Link href="/products" onClick={toggleMenu}>Products</Link></li>
              <li><Link href="/about" onClick={toggleMenu}>About</Link></li>
              <li><Link href="/contact" onClick={toggleMenu}>Contact</Link></li>
              <li><Link href="/orders" onClick={toggleMenu}>My Orders</Link></li>
            </ul>
          </nav>
          <Link href="/cart">
            <Button variant="outline" className="hidden md:flex">
              <ShoppingCart className="mr-2 h-4 w-4" /> Cart ({cartItemCount})
            </Button>
          </Link>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <Link href="/cart">
              <Button variant="outline" className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> Cart ({cartItemCount})
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}