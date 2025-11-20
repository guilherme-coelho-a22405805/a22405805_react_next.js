import Link from 'next/link';
import React from 'react';

interface ProjetosProps {
    nome: string;
    url: string;
}

export default function Projetos({ nome, url }: ProjetosProps) {
    return (
        <article>
            <h1>{nome}</h1>
            <p>
                Explore o projeto no seguinte link:{" "}
                <Link href={url}>Aceder ao Projeto</Link>
            </p>
        </article>
    );
} 
