'use client'
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/interfaces';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProdutosPage() {
  const { data, error, isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products', fetcher);

  if (error) return <div>Falha ao carregar produtos</div>;
  if (isLoading) return <div>A carregar...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {data?.map((product) => (
        <Link key={product.id} href={`/produtos/${product.id}`} className="border p-4 rounded hover:shadow-lg">
            <div className="relative w-full h-48 mb-4">
              <Image src={product.image} alt={product.title} fill className="object-contain" />
            </div>
            <h2 className="font-bold text-lg">{product.title}</h2>
            <p className="text-green-600 font-bold">{product.price} €</p>
            <p className="text-sm text-gray-500">{product.category}</p>
        </Link>
      ))}
    </div>
  );
}