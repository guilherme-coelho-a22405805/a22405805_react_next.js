'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Product } from '@/interfaces';
import ProdutoCard from '@/components/ProdutoCard/ProdutoCard';

const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) throw new Error('Erro ao carregar dados');
    return res.json();
});

export default function ProdutosPage() {
    // 1. Obter dados da API
    const { data, error, isLoading } = useSWR<Product[]>(
        'https://deisishop.pythonanywhere.com/products/',
        fetcher
    );

    // 2. Estados (Pesquisa, Ordenação e Dados Filtrados)
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("default"); // Estado para a ordenação
    const [filteredData, setFilteredData] = useState<Product[]>([]);

    // 3. useEffect: Gere a Filtragem E a Ordenação
    useEffect(() => {
        if (data) {
            // Passo A: Filtrar (Pesquisa)
            // .filter cria um NOVO array, por isso podemos modificá-lo a seguir
            let result = data.filter(produto => 
                produto.title.toLowerCase().includes(search.toLowerCase()) ||
                produto.category.toLowerCase().includes(search.toLowerCase())
            );

            // Passo B: Ordenar
            // A função .sort altera o array "in place"
            if (sortOrder === 'price-asc') {
                result.sort((a, b) => a.price - b.price);
            } else if (sortOrder === 'price-desc') {
                result.sort((a, b) => b.price - a.price);
            } else if (sortOrder === 'name-asc') {
                // localeCompare é a forma correta de ordenar textos com acentos/maíusculas
                result.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOrder === 'name-desc') {
                result.sort((a, b) => b.title.localeCompare(a.title));
            }

            // Passo C: Guardar no estado final
            setFilteredData(result);
        }
    }, [search, data, sortOrder]); // Executa se a pesquisa, os dados OU a ordenação mudarem

    if (error) return <div className="text-center p-10 text-red-500">Falha no carregamento.</div>;
    if (isLoading) return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white shadow-sm mb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                        DEISI Shop
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Os melhores produtos tecnológicos ao melhor preço.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Área de Filtros e Pesquisa */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    
                    {/* Input de Pesquisa */}
                    <div className="flex-grow relative">
                        <input 
                            type="text"
                            placeholder="Pesquisar produtos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-4 pl-12 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        <svg className="w-6 h-6 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Select de Ordenação */}
                    <div className="md:w-64">
                        <select 
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white cursor-pointer"
                        >
                            <option value="default">Ordenar por...</option>
                            <option value="price-asc">Preço: Menor para Maior</option>
                            <option value="price-desc">Preço: Maior para Menor</option>
                            <option value="name-asc">Nome: A - Z</option>
                            <option value="name-desc">Nome: Z - A</option>
                        </select>
                    </div>
                </div>

                {/* Grelha de Produtos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredData && filteredData.length > 0 ? (
                        filteredData.map((produto) => (
                            <ProdutoCard key={produto.id} produto={produto} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-20 text-xl">
                            Nenhum produto encontrado.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}