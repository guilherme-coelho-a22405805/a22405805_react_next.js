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
    const { data, error, isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products/', fetcher);
    
    // Estados Gerais
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("default");
    const [filteredData, setFilteredData] = useState<Product[]>([]);
    
    // Estados do Carrinho e Compra
    const [cart, setCart] = useState<Product[]>([]);
    const [isStudent, setIsStudent] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [msgCompra, setMsgCompra] = useState("");

    // Carregar carrinho
    useEffect(() => {
        const storedCart = localStorage.getItem('carrinho');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Guardar carrinho
    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(cart));
    }, [cart]);

    // Filtrar e Ordenar
    useEffect(() => {
        if (data) {
            let result = data.filter(produto => 
                produto.title.toLowerCase().includes(search.toLowerCase())
            );

            if (sortOrder === 'price-asc') result.sort((a, b) => a.price - b.price);
            else if (sortOrder === 'price-desc') result.sort((a, b) => b.price - a.price);
            else if (sortOrder === 'name-asc') result.sort((a, b) => a.title.localeCompare(b.title));
            else if (sortOrder === 'name-desc') result.sort((a, b) => b.title.localeCompare(a.title));

            setFilteredData(result);
        }
    }, [search, data, sortOrder]);

    function addToCart(produto: Product) {
        setCart((prevCart) => [...prevCart, produto]);
    }

    function removeFromCart(indexToRemove: number) {
        setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
    }

    // --- FUNÇÃO DE COMPRA ---
    async function comprar() {
        const productIds = cart.map(item => item.id);
        const dados = {
            products: productIds,
            student: isStudent,
            coupon: coupon
        };

        try {
            const resposta = await fetch('https://deisishop.pythonanywhere.com/buy/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            const resultado = await resposta.json();

            if (resposta.ok) {
                setMsgCompra(`Sucesso! Ref: ${resultado.reference}. Total: ${resultado.totalCost}€`);
                setCart([]); 
                setCoupon("");
            } else {
                setMsgCompra(`Erro: ${resultado.error}`);
            }
        } catch (error) {
            console.error(error);
            setMsgCompra("Erro ao comunicar com a loja.");
        }
    }

    const totalCost = cart.reduce((total, item) => total + item.price, 0);

    if (error) return <div>Erro ao carregar</div>;
    if (isLoading) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div></div>;

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-black text-3xl font-bold mb-6 text-center">DEISI Shop</h1>

            <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                {/* Esquerda: Produtos */}
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <input 
                            type="text" placeholder="Pesquisar..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="text-black flex-grow p-3 border rounded-lg shadow-sm"
                        />
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="text-black p-3 border rounded-lg bg-white">
                            <option value="default">Ordenar...</option>
                            <option value="price-asc">Preço: Menor</option>
                            <option value="price-desc">Preço: Maior</option>
                        </select>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredData.map((produto) => (
                            <ProdutoCard key={produto.id} produto={produto} adicionarAoCarrinho={addToCart} />
                        ))}
                    </div>
                </div>

                {/* Direita: Carrinho */}
                <div className="w-full lg:w-80 bg-white p-6 rounded-xl shadow-lg h-fit sticky top-6">
                    <h2 className="text-black text-2xl font-bold mb-4 border-b pb-2">Carrinho</h2>
                    
                    {cart.length === 0 ? (
                        <p className="text-gray-500">Vazio.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {cart.map((produto, index) => (
                                <div key={index} className="border-b pb-2">
                                    <ProdutoCard produto={produto} removerDoCarrinho={() => removeFromCart(index)} />
                                </div>
                            ))}
                            
                            {/* CHECKOUT AREA */}
                            <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="student" checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} className="w-4 h-4"/>
                                    <label htmlFor="student" className="text-sm">Estudante DEISI</label>
                                </div>

                                <input type="text" placeholder="Cupão" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="w-full p-2 border rounded text-sm"/>

                                <div className="flex justify-between font-bold text-xl">
                                    <span>Total:</span><span>{totalCost} €</span>
                                </div>

                                <button onClick={comprar} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 shadow">
                                    Comprar
                                </button>

                                {msgCompra && <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded">{msgCompra}</p>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}