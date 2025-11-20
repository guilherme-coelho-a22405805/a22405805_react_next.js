import Link from 'next/link'
import React from 'react'

export default function DescricaoProjetos() {
  return (
    <div className="bg-amber-200 p-2 m-3 rounded-x1 text-center">
        <h2>Projetos</h2>
        <p>Visite o meu Website</p>
        <Link 
            target='_blank' 
            href="https://guilherme-coelho-a22405805.github.io/a22405805GuilhermeCoelho.github.io"
            className='font-bold under-line'>
        Website</Link>
    </div>
  )
}
