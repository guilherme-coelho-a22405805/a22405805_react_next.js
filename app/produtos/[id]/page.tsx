'use client'
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProdutoDetalhe({ params }: { params: { id: string } }) {
  const { data: product, isLoading } = useSWR(`https://deisishop.pythonanywhere.com/products/${params.id}`, fetcher);
  const [noCarrinho, setNoCarrinho] = useState(false);

  // Verificar se já está no carrinho ao carregar
  useEffect(() => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    if (carrinho.includes(params.id)) setNoCarrinho(true);
  }, [params.id]);

  // Função para alternar estado (Adicionar/Remover)
  const toggleCarrinho = () => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    
    if (noCarrinho) {
      carrinho = carrinho.filter((id: string) => id !== params.id); // Remover
    } else {
      carrinho.push(params.id); // Adicionar
    }
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    setNoCarrinho(!noCarrinho);
  };

  if (isLoading) return <div>A carregar produto...</div>;
  if (!product) return <div>Produto não encontrado.</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      <div className="relative w-full md:w-1/2 h-96">
        <Image src={product.image} alt={product.title} fill className="object-contain" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-700 mb-6">{product.description}</p>
        <div className="text-2xl text-green-600 font-bold mb-4">{product.price} €</div>
        
        <button 
          onClick={toggleCarrinho}
          className={`px-6 py-2 rounded text-white ${noCarrinho ? 'bg-red-500' : 'bg-blue-500'}`}
        >
          {noCarrinho ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'}
        </button>
      </div>
    </div>
  );
}