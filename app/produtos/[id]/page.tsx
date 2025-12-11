'use client';

import React from 'react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
// CORREÇÃO: Confirma se o ficheiro está em 'models' ou na raiz
import { Product } from '@/interfaces'; 
import ProdutoDetalhe from '@/components/ProdutoCard/ProdutoCard';
// CORREÇÃO: Confirma se o caminho da pasta está correto (maiúsculas/minúsculas)


const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) throw new Error('Erro ao carregar o produto');
    return res.json();
});

export default function ProdutoPage() {
    const params = useParams();
    const id = params.id;

    const { data, error, isLoading } = useSWR<Product>(
        id ? `https://deisishop.pythonanywhere.com/products/${id}` : null,
        fetcher
    );

    if (isLoading) return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
    );

    if (error || !data) return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-red-500 gap-4">
            <p className="text-xl font-bold">Produto não encontrado.</p>
            <a href="/produtos" className="text-blue-600 underline">Voltar</a>
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <ProdutoDetalhe produto={data} />
        </main>
    );
}