'use client';

import React from 'react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
// Ajusta este import conforme a tua estrutura (se usaste index.tsx ou não)
import { Product } from '@/interfaces'; 
import ProdutoDetalhe from '@/components/ProdutoCard/ProdutoCard'; 

const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) throw new Error('Erro ao carregar o produto');
    return res.json();
});

export default function ProdutoPage() {
    const params = useParams();
    // Garante que o params.id existe antes de usar
    const id = params?.id; 

    const { data, error, isLoading } = useSWR<Product>(
        id ? `https://deisishop.pythonanywhere.com/products/${id}` : null,
        fetcher
    );

    if (isLoading) return <div className="p-10 text-center text-black">A carregar detalhes...</div>;
    
    if (error || !data) return <div className="p-10 text-center text-red-500">Produto não encontrado.</div>;

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
            <ProdutoDetalhe produto={data} />
        </main>
    );
}