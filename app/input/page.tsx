'use client';

import { useState } from 'react';

export default function InputPage() {
  // 1. Estado para o Input de Texto (Echo)
  const [texto, setTexto] = useState("");

  // 2. Estado para o Seletor
  const [tecnologia, setTecnologia] = useState("React");

  // 3. Estados para a Lista de Tarefas
  const [tarefas, setTarefas] = useState<string[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  // --- Funções de Lógica ---

  function adicionar() {
    if (novaTarefa.trim() === "") return;
    setTarefas([...tarefas, novaTarefa]);
    setNovaTarefa("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      adicionar();
    }
  }

  function apagar(index: number) {
    const novasTarefas = tarefas.filter((_, i) => i !== index);
    setTarefas(novasTarefas);
  }

  function editar(index: number) {
    const novoTexto = prompt("Editar tarefa:", tarefas[index]);
    if (novoTexto !== null && novoTexto.trim() !== "") {
      const novasTarefas = [...tarefas];
      novasTarefas[index] = novoTexto;
      setTarefas(novasTarefas);
    }
  }

  // --- Renderização (JSX) ---

  return (
    <div className="min-h-screen bg-blue-500 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Laboratório de Inputs</h1>

      <div className="w-full max-w-md flex flex-col gap-6 px-4">
        
        {/* 1. Cartão Eco de Texto */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-bold text-gray-700 mb-2 border-b pb-2">1. Escreve</h3>
          <div className="flex flex-col gap-3">
            <input 
              className="border-2 border-gray-300 p-2 rounded-md text-gray-800 focus:outline-none focus:border-blue-500"
              type="text" 
              placeholder="Escreve algo aqui..." 
              value={texto} 
              onChange={(e) => setTexto(e.target.value)} 
            />
            <p className="text-gray-600">
              Texto digitado: <span className="font-bold text-blue-600">{texto || "..."}</span>
            </p>
          </div>
        </section>

        {/* 2. Cartão Seletor */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-bold text-gray-700 mb-2 border-b pb-2">2. Seletor</h3>
          <div className="flex flex-col gap-3">
            <select 
              className="border-2 border-gray-300 p-2 rounded-md text-gray-800 focus:outline-none focus:border-blue-500 bg-white"
              value={tecnologia} 
              onChange={(e) => setTecnologia(e.target.value)}
            >
              <option value="React">React</option>
              <option value="Next.js">Next.js</option>
              <option value="TypeScript">TypeScript</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Node.js">Node.js</option>
              <option value="Python">Python</option>
              <option value="Tailwind CSS">Tailwind CSS</option>
            </select>
            <p className="text-gray-600">
              Selecionaste: <span className="font-bold text-blue-600">{tecnologia}</span>
            </p>
          </div>
        </section>

        {/* 3. Cartão Lista de Tarefas */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-bold text-gray-700 mb-2 border-b pb-2">3. Lista de Tarefas</h3>
          
          <div className="flex gap-2 mb-4">
            <input 
              className="flex-1 border-2 border-gray-300 p-2 rounded-md text-gray-800 focus:outline-none focus:border-blue-500"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nova tarefa..."
            />
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors" 
              onClick={adicionar}
            >
              Inserir
            </button>
          </div>

          {tarefas.length === 0 ? (
            <p className="text-gray-400 italic text-center">Nenhuma tarefa adicionada.</p>
          ) : (
            <ul className="space-y-2">
              {tarefas.map((t, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-200">
                  {/* Aqui garanto a cor do texto da tarefa */}
                  <span className="text-gray-800 font-medium break-all mr-2">• {t}</span>
                  
                  <div className="flex gap-2 shrink-0">
                    <button 
                      onClick={() => editar(index)} 
                      className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-colors"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => apagar(index)} 
                      className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                    >
                      Apagar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

      </div>
    </div>
  );
}