import  MagiaDoJSX from '@/app/componentes/MagiaDoJSX/MagiaDoJSX'
import Link from 'next/link'

export default function page() {
  return (
    <div>
        <h2>Interfaces Modernas</h2>
        <p>Bem vindo à minha app em React e Next.js.</p>
        <header className = "flex flex-col items-center">
          <h1>React & Next.js</h1>
          <nav className = "flex gap-4">
            <Link href="/">Intro</Link>
            <Link href="/sobre">Sobre</Link>
          </nav>
        </header>
        <MagiaDoJSX/>

    </div>
  )
}