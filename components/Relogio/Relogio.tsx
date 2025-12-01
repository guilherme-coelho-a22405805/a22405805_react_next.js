// components/Relogio.tsx
'use client';

import { useState, useEffect } from 'react';

export default function Relogio() {
  // Estado para guardar a hora atual string
  const [hora, setHora] = useState<string>('');

  useEffect(() => {
    // 1. Função que atualiza o estado
    const atualizar = () => {
        setHora(new Date().toLocaleTimeString());
    };

    // Atualiza logo no início para não esperar 1 segundo
    atualizar();

    // 2. Define o intervalo de 1 segundo (1000ms) 
    const id = setInterval(atualizar, 1000);

    // 3. Limpeza (Cleanup) quando o componente desmonta 
    return () => clearInterval(id);
  }, []);
  if (!hora) return null;

  return (
    <span style={{ marginLeft: '15px', fontWeight: 'bold', fontFamily: 'monospace' }}>
      {hora}
    </span>
  );
}