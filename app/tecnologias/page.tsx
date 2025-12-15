"use client"; 
import tecnologiasJson from "@/app/data/tecnologias.json";
import TecnologiaCard from "@/components/TecnologiaCard/TecnologiaCard"; 

export default function Page() {
  return (
    <main className="px-8 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Tecnologias Exploradas
      </h2>

      {/* --- GRID LAYOUT RESPONSIVO --- */}
      {/* Esta section define a grelha onde os cartões vão ficar:
         - grid-cols-1: Em telemóveis , mostra 1 coluna.
         - md:grid-cols-2: Em tablets , passa para 2 colunas.
         - lg:grid-cols-3: Em computadores , mostra 3 colunas.
         - gap-8: Cria um espaçamento consistente entre os cartões.
      */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* --- RENDERIZAÇÃO DE LISTA (.map) --- */}
        {/* Percorremos o array do JSON e criamos um componente <TecnologiaCard> para cada item. */}
        {tecnologiasJson.map((tec: any) => (
          <TecnologiaCard 
            key={tec.title} 
            
            // PROP: Passamos o objeto inteiro 'tec' para o componente filho desenhar as informações.
            tec={tec} 
          />
        ))}

      </section>
    </main>
  );
}