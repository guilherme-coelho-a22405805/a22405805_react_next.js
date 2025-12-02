"use client"; 
import tecnologiasJson from "@/app/data/tecnologias.json";
import TecnologiaCard from "@/components/TecnologiaCard/TecnologiaCard"; 

export default function Page() {
  return (
    <main className="px-8 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Tecnologias Exploradas
      </h2>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tecnologiasJson.map((tec: any) => (
          <TecnologiaCard key={tec.title} tec={tec} />
        ))}
      </section>
    </main>
  );
}