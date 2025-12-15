'use client';

import React from 'react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { Product } from '@/interfaces'; 
import ProdutosDetalhe from '@/components/ProdutosDetalhe/ProdutosDetalhe';

const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) throw new Error('Erro ao carregar');
    return res.json();
});

export default function PaginaProduto() {
    const params = useParams();
    const id = params?.id; 

    const { data, error, isLoading } = useSWR<Product>(
        id ? `https://deisishop.pythonanywhere.com/products/${id}` : null,
        fetcher
    );

    if (isLoading) return <div className="min-h-screen flex items-center justify-center text-black">A carregar...</div>;
    if (error || !data) return <div className="min-h-screen flex items-center justify-center text-red-500">Erro ao carregar produto.</div>;

    return (
        <main className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
            <ProdutosDetalhe produto={data} />
        </main>
    );
}