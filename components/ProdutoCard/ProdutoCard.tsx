import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/interfaces';

interface ProdutoCardProps {
    produto: Product;
    adicionarAoCarrinho?: (p: Product) => void; // Opcional (?)
    removerDoCarrinho?: () => void;            // Opcional (?)
}

export default function ProdutoCard({ produto, adicionarAoCarrinho, removerDoCarrinho }: ProdutoCardProps) {
    const imagePrefix = 'https://deisishop.pythonanywhere.com';
    const imageUrl = produto.image.startsWith('http') 
        ? produto.image 
        : `${imagePrefix}${produto.image}`;

    return (
        <article className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all p-4 h-full">
            
            <div className="relative w-full aspect-square bg-gray-50 mb-4 overflow-hidden rounded-md">
                <Image 
                    src={imageUrl} 
                    alt={produto.title}
                    fill
                    className="object-contain mix-blend-multiply hover:scale-105 transition-transform"
                />
            </div>
            
            <div className="flex flex-col flex-grow">
                <h3 className="text-md font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
                    {produto.title}
                </h3>
                
                <div className="mt-auto pt-2 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-extrabold text-gray-900">{produto.price} €</span>
                    </div>

                    <div className="flex gap-2 text-sm">
                        {/* Botão +Info (Sempre visível) */}
                        <Link href={`/produtos/${produto.id}`} className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded text-center">
                            Info
                        </Link>

                        {/* Lógica Condicional dos Botões */}
                        {removerDoCarrinho ? (
                            <button 
                                onClick={removerDoCarrinho}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-bold"
                            >
                                Remover
                            </button>
                        ) : (
                            <button 
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