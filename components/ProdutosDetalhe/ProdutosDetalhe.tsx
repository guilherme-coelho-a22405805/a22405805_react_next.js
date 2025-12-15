'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/interfaces';

export default function ProdutosDetalhe({ produto }: { produto: Product }) {
    if (!produto) return null;

    const imagePrefix = 'https://deisishop.pythonanywhere.com';
    const imageUrl = produto.image.startsWith('http') ? produto.image : `${imagePrefix}${produto.image}`;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row gap-8">
            <div className="relative w-full md:w-1/2 h-96">
                <Image src={imageUrl} alt={produto.title} fill className="object-contain" />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h1 className="text-3xl font-bold mb-4">{produto.title}</h1>
                <p className="text-gray-600 mb-6">{produto.description}</p>
                <div className="text-sm text-gray-500 mb-4">Categoria: {produto.category}</div>
                
                <div className="text-3xl font-bold text-blue-600 mb-8">
                    {Number(produto.price).toFixed(2)} €
                </div>

                <Link href="/produtos" className="bg-gray-800 text-white py-3 px-6 rounded-lg text-center font-bold hover:bg-gray-700 transition">
                    ← Voltar à Lista
                </Link>
            </div>
        </div>
    );
}