"use client"; 
import { useState, useEffect } from "react";

// PROPS (TypeScript):
// Recebemos 'title' como propriedade. Isto é crucial para a REUTILIZAÇÃO.
// O 'title' vai servir como ID único para guardar os likes de cada projeto separadamente.
export default function ContadorPersonalizado({ title }: { title: string }) {
  
  // Estado local para atualização imediata da UI
  const [likes, setLikes] = useState(0);

  // 1. EFEITO DE LEITURA 
  // Corre quando o componente monta OU quando o 'title' muda.
  useEffect(() => {
    const stored = localStorage.getItem(`likes-${title}`);
    
    if (stored) {
      setLikes(parseInt(stored)); // Converte string para número
    }
  }, [title]);

  // 2. FUNÇÃO DE ATUALIZAÇÃO
  const handleClick = () => {
    const novoValor = likes + 1;
    
    // Atualiza o estado visual
    setLikes(novoValor);
    
    localStorage.setItem(`likes-${title}`, novoValor.toString());
  };

  return (
    <button 
      onClick={handleClick}
      className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      👍 {likes} Likes
    </button>
  );
}