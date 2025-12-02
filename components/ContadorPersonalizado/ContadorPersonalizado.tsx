"use client";
import { useState, useEffect } from "react";

export default function ContadorPersonalizado({ title }: { title: string }) {
  const [likes, setLikes] = useState(0);

  // 1. Carregar do LocalStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem(`likes-${title}`);
    if (stored) {
      setLikes(parseInt(stored));
    }
  }, [title]);

  // 2. Atualizar estado e LocalStorage ao clicar
  const handleClick = () => {
    const novoValor = likes + 1;
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