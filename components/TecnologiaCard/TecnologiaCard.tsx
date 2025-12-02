import Image from "next/image";
import ContadorPersonalizado from "@/components/ContadorPersonalizado/ContadorPersonalizado"; // Importar o contador

export default function TecnologiaCard({ tec }: { tec: any }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border hover:shadow-xl transition">
      
      <Image
        src={`/tecnologias/${tec.image}`}
        alt={tec.title}
        width={120}
        height={120}
        className="mb-4"
      />

      <h3 className="text-gray-700 text-xl font-semibold mb-2">{tec.title}</h3>
      <p className="text-gray-700 mb-4">{tec.description}</p>

      <span className="font-bold text-yellow-500 mb-2">
         ⭐ {tec.rating}/5
      </span>

      {/* Integração do Contador */}
      <ContadorPersonalizado title={tec.title} />
      
    </div>
  );
}