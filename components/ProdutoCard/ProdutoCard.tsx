'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import { Product } from '@/interfaces'; 

interface ProdutoCardProps {
  produto: Product;
  adicionarAoCarrinho?: (p: Product) => void;
  removerDoCarrinho?: () => void;
}

export default function ProdutoCard({ produto, adicionarAoCarrinho, removerDoCarrinho }: ProdutoCardProps) {
  const imagePrefix = 'https://deisishop.pythonanywhere.com';
  const imageUrl = produto.image.startsWith('http') ? produto.image : `${imagePrefix}${produto.image}`;

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-4 h-full">
      <div className="relative w-full h-48 mb-4">
        <Image 
            src={imageUrl} 
            alt={produto.title} 
            fill 
            className="object-contain" 
        />
      </div>
      
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{produto.title}</h3>
        
        <div className="mt-auto pt-4 space-y-2">
            <div className="text-xl font-bold text-gray-900">{Number(produto.price).toFixed(2)} €</div>
            
            <div className="flex gap-2">
                
                <Link 
                    href={`/produtos/${produto.id}`} 
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded text-center"
                >
                    + Info
                </Link>

                {removerDoCarrinho ? (
                    <button onClick={removerDoCarrinho} className="flex-1 bg-red-500 text-white font-bold py-2 px-4 rounded">
                        Remover
                    </button>
                ) : (
                    <button onClick={() => adicionarAoCarrinho && adicionarAoCarrinho(produto)} className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Comprar
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}