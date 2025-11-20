"use client";

import Image from "next/image";
import tecnologiasJson from "@/app/data/tecnologias.json";

export default function Page() {
  const tecnologias = JSON.parse(JSON.stringify(tecnologiasJson));

  return (
    <main className="px-8 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Tecnologias Exploradas
      </h2>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tecnologias.map((tec: any) => (
          <div
            key={tec.title}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border hover:shadow-xl transition"
          >
            <Image
              src={`/tecnologias/${tec.image}`}
              alt={tec.title}
              width={120}
              height={120}
              className="mb-4"
            />

            <h3 className="text-gray-700 text-xl font-semibold mb-2">{tec.title}</h3>

            <p className="text-gray-700 mb-4">{tec.description}</p>


            <span className="font-bold text-yellow-500">
              ⭐ {tec.rating}/5
            </span>
          </div>
        ))}
      </section>
    </main>
  );
}
