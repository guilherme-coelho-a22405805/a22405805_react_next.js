'use client'
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CategoriasPage() {
  const { data: categories } = useSWR<string[]>('https://deisishop.pythonanywhere.com/categories', fetcher);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Categorias</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories?.map((cat) => (
          <Link 
            key={cat} 
            href={`/categorias/${cat}`}
            className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 capitalize font-semibold"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}