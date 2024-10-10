import { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

interface Props {
  params: { id: string }
}

export async function generateStaticParams() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return products.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product = await res.json();

  return {
    title: product.title,
    description: product.description,
  };
}

export default function ProductPage({ params }: Props) {
  return <ProductDetail id={params.id} />;
}