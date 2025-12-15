'use client'; 

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Product } from '@/interfaces'; 
import ProdutoCard from '@/components/ProdutoCard/ProdutoCard';

// --- FETCHER ---
// Função utilitária que o SWR usa para fazer o pedido HTTP GET.
const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) throw new Error('Erro ao carregar dados');
    return res.json();
});

export default function ProdutosPage() {
    // --- 1. DATA FETCHING (GET) ---
    // O useSWR gere automaticamente o cache, revalidação e estados de loading/erro.
    const { data, error, isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products/', fetcher);
    
    // --- 2. GESTÃO DE ESTADO (State) ---
    const [search, setSearch] = useState("");              // Texto da barra de pesquisa
    const [filteredData, setFilteredData] = useState<Product[]>([]); // Lista de produtos filtrada pela pesquisa
    const [cart, setCart] = useState<Product[]>([]);       // Carrinho de compras 

    // Estados para o formulário de Checkout
    const [isStudent, setIsStudent] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [msgCompra, setMsgCompra] = useState("");

    // --- 3. Local Storage ---

    // Efeito de Leitura 
    // Vai verificar se já existe um carrinho guardado no browser.
    useEffect(() => {
        const storedCart = localStorage.getItem('carrinho');
        if (storedCart) setCart(JSON.parse(storedCart)); 
    }, []);

    // Efeito de Escrita 
    // Guarda o estado atual do carrinho no browser para não se perder ao fazer refresh.
    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(cart)); 
    }, [cart]);

    // --- 4. LÓGICA DE FILTRAGEM ---
    // Sempre que os dados da API chegam (data) ou o utilizador escreve (search),
    // atualizamos a lista 'filteredData'.
    useEffect(() => {
        if (data) {
            setFilteredData(data.filter(produto => 
                produto.title.toLowerCase().includes(search.toLowerCase())
            ));
        }
    }, [search, data]);

    // --- 5. MANIPULAÇÃO DO CARRINHO  ---

    function addToCart(produto: Product) {
        // Cria um NOVO array com tudo o que estava lá antes (...prev) + o novo produto.
        setCart((prev) => [...prev, produto]);
    }

    function removeFromCart(index: number) {
        // Cria um NOVO array excluindo o item que está no índice clicado.
        setCart((prev) => prev.filter((_, i) => i !== index));
    }

    // --- 6. COMUNICAÇÃO COM API (POST) ---
    // Função assíncrona porque temos de esperar pela resposta do servidor.
    async function comprar() {
        const dados = {
            products: cart.map(item => item.id), // Transformar array de Objetos em array de IDs
            student: isStudent,
            coupon: coupon,
            name: "Utilizador" 
        };

        try {
            const resposta = await fetch('https://deisishop.pythonanywhere.com/buy/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(dados)
            });

            // Verificar se houve erro 
            if (!resposta.ok) {
                const erro = await resposta.json();
                setMsgCompra(`Erro: ${erro.error}`);
                return; 
            }

            // Sucesso!
            const resultado = await resposta.json();
            setMsgCompra(`Compra efetuada! Referência: ${resultado.reference}. Total pago: ${resultado.totalCost}€`);
            
            // Resetar a loja
            setCart([]); 
            setCoupon(""); 

        } catch (error) {
            console.error(error);
            setMsgCompra("Erro ao comunicar com o servidor.");
        }
    }

    // --- 7. CÁLCULO DO TOTAL ---
    // .reduce percorre o carrinho e acumula o preço total.
    // IMPORTANTE: Number(item.price) converte a string "20.0" em número 20.0 para somar corretamente.
    const totalCost = cart.reduce((total, item) => total + Number(item.price), 0);

    // --- 8. RENDERIZAÇÃO CONDICIONAL ---
    if (error) return <div>Erro a carregar</div>;
    if (isLoading) return <div>A carregar...</div>;

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-black">DEISI Shop</h1>

            <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                {/* Coluna da Esquerda: Lista de Produtos */}
                <div className="flex-1">
                    <input 
                        type="text" placeholder="Pesquisar..." value={search} onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-3 mb-6 border rounded-lg text-black"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Mapear os dados filtrados para criar cartões */}
                        {filteredData.map((produto) => (
                            <ProdutoCard key={produto.id} produto={produto} adicionarAoCarrinho={addToCart} />
                        ))}
                    </div>
                </div>

                {/* Coluna da Direita: Carrinho e Checkout */}
                <div className="w-full lg:w-96 bg-white p-6 rounded-xl shadow-lg h-fit sticky top-6">
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-black">Carrinho</h2>
                    
                    {cart.length === 0 ? <p className="text-gray-500">Carrinho vazio.</p> : (
                        <>
                            <div className="flex flex-col gap-4 mb-4 max-h-60 overflow-y-auto">
                                {cart.map((produto, index) => (
                                    // Nota: Usamos o index como key aqui porque podemos ter produtos repetidos no carrinho
                                    <ProdutoCard key={index} produto={produto} removerDoCarrinho={() => removeFromCart(index)} />
                                ))}
                            </div>

                            {/* --- ÁREA DE CHECKOUT --- */}
                            <div className="pt-4 border-t border-gray-200 space-y-4">
                                <label className="flex items-center space-x-2 text-black cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={isStudent} 
                                        onChange={(e) => setIsStudent(e.target.checked)}
                                        className="w-4 h-4"
                                    />
                                    <span>Sou estudante DEISI</span>
                                </label>

                                <input 
                                    type="text" 
                                    placeholder="Cupão de desconto" 
                                    value={coupon} 
                                    onChange={(e) => setCoupon(e.target.value)}
                                    className="w-full p-2 border rounded text-black"
                                />

                                <div className="text-xl font-bold flex justify-between text-black">
                                    <span>Total:</span>
                                    {/* .toFixed(2) garante sempre 2 casas decimais (ex: 20.50) */}
                                    <span>{totalCost} €</span>
                                </div>

                                <button 
                                    onClick={comprar}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
                                >
                                    Comprar
                                </button>

                                {/* Feedback Visual da Compra */}
                                {msgCompra && (
                                    <div className={`p-3 rounded text-sm ${msgCompra.includes('Erro') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                        {msgCompra}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}