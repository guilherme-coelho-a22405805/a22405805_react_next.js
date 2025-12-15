'use client';

import React from 'react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { Product } from '@/interfaces'; 
import ProdutosDetalhe from '@/components/ProdutosDetalhe/ProdutosDetalhe';

// --- FETCHER ---
// Função auxiliar que o SWR usa para ir buscar os dados.
// É responsável por fazer o pedido HTTP e converter a resposta em JSON.
const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) throw new Error('Erro ao carregar');
    return res.json();
});


export default function PaginaProduto() {
    // --- 1. OBTER O ID DA URL ---
    // O hook useParams lê os parâmetros da rota dinâmica.
    const params = useParams();
    const id = params?.id; 

    // --- 2. DATA FETCHING (useSWR) ---
    // <Product> indica ao TypeScript que os dados recebidos terão o formato da interface Product.
    const { data, error, isLoading } = useSWR<Product>(
        // Se 'id' existir, faz o pedido à API.
        // Se 'id' for null/undefined, passa null e o SWR não faz nada.
        id ? `https://deisishop.pythonanywhere.com/products/${id}` : null,
        fetcher
    );

    // --- 3. RENDERIZAÇÃO CONDICIONAL  ---
    
    // Estado de Carregamento: Mostra feedback enquanto os dados não chegam
    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center text-black">
            A carregar...
        </div>
    );

    // Estado de Erro: Se deu erro no fetch OU se os dados vieram vazios
    if (error || !data) return (
        <div className="min-h-screen flex items-center justify-center text-red-500">
            Erro ao carregar produto.
        </div>
    );

    // --- 4. RENDERIZAÇÃO FINAL ---
    // Se o código chegou aqui, temos a certeza que 'data' existe e está completo.
    return (
        <main className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
            {/* Passamos os dados limpos para o componente visual */}
            <ProdutosDetalhe produto={data} />
        </main>
    );
}