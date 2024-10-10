import ProductList from '@/components/ProductList';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our E-commerce Store</h1>
      <Button className="mb-8">Shop Now</Button>
      <ProductList />
    </div>
  );
}