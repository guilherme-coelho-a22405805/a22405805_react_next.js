import React from 'react'

// Definição do array fora do componente 
const caracteristicas = [
    'JSX, sintaxe que mistura HTML e JS.',
    'Componentes, funções que retornam JSX.',
    'Componentes Reutilizáveis e Modulares.',
    'Roteamento Automático e APIs.',
    'Hooks: useState, useEffect e useSWR.',
    'Renderização Rápida e SEO Friendly.',
    'TypeScript Seguro e Escalável.',
    'Comunidade Ativa e Popularidade.'
]



export default function page() {
  return (
    
    <>
        <h2>Características do React e Next.js</h2>
        
        <ul>
            {/* RENDERIZAÇÃO DE LISTA DINÂMICA */}
            {/* O método .map() percorre o array e retorna um elemento <li> para cada item. */}
            {caracteristicas.map((caracteristica, i) => {
                // O atributo 'key' é obrigatório para listas no React server para saber quais itens foram alterados, adicionados ou removidos.
                // Nota: Usar o índice 'i' é seguro aqui pois a lista é estática e não será reordenada.
                return <li key={i}>{caracteristica}</li>
                
            })}
        </ul>
    </>
  )
}