import DescricaoProjetos from "@/components/DescricaoProjetos/DescricaoProjetos";

// Página Base para receber os projetos 
export default function ProjetosPage() {
  return (
    <main className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Projetos</h2>
      <DescricaoProjetos />
    </main>
  );
}
