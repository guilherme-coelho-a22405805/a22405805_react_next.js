'use client'; // Adiciona isto para garantir que os onClicks funcionam

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
// ATENÇÃO: Se o teu ficheiro de interfaces estiver noutro sítio, ajusta esta linha:
import { Product } from '@/interfaces'; 
// OU se estiver em models: import { Product } from '@/models/interfaces';

interface ProdutoCardProps {
    produto: Product;
    // O ? torna estas propriedades opcionais (para não dar erro se não as passares)
    adicionarAoCarrinho?: (p: Product) => void;
    removerDoCarrinho?: () => void;
}

export default function ProdutoCard({ produto, adicionarAoCarrinho, removerDoCarrinho }: ProdutoCardProps) {
    
    // Verificação de segurança: Se o produto vier vazio, não renderiza nada para não dar erro
    if (!produto) return null;

    const imagePrefix = 'https://deisishop.pythonanywhere.com';
    // Garante que a imagem tem um URL válido
    const imageUrl = produto.image && produto.image.startsWith('http') 
        ? produto.image 
        : `${imagePrefix}${produto.image}`;

    return (
        <article className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all p-4 h-full">
            
            <div className="relative w-full aspect-square bg-gray-50 mb-4 overflow-hidden rounded-md">
                {/* Se imageUrl for inválido, o Image do Next pode dar erro. Confirmamos que existe. */}
                {imageUrl && (
                    <Image 
                        src={imageUrl} 
                        alt={produto.title || "Produto"}
                        fill
                        className="object-contain mix-blend-multiply hover:scale-105 transition-transform"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                )}
            </div>
            
            <div className="flex flex-col flex-grow">
                <h3 className="text-md font-bold text-black leading-tight mb-2 line-clamp-2">
                    {produto.title}
                </h3>
                
                <div className="mt-auto pt-2 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-extrabold text-black">
                            {produto.price ? produto.price : "0.00"} €
                        </span>
                    </div>

                    <div className="flex gap-2 text-sm">
                        {/* IMPORTANTE: O componente Link deve ter o href válido.
                           Se produto.id for undefined, isto dava erro.
                        */}
                        <Link 
                            href={`/produtos/${produto.id}`} 
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-black py-2 rounded text-center flex items-center justify-center font-semibold"
                        >
                            + Info
                        </Link>

                        {removerDoCarrinho ? (
                            <button 
                                onClick={removerDoCarrinho}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-bold"
                            >
                                Remover
                            </button>
                        ) : (
                            <button 
                                // O onClick verifica se a função existe antes de chamar
                                onClick={() => adicionarAoCarrinho && adicionarAoCarrinho(produto)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
                            >
                                Comprar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}