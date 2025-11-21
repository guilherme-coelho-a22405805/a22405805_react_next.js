interface ProjetoProps {
  nome: string;
  url: string;
}

export default function Projeto({ nome, url }: ProjetoProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <p className="text-gray-800">
        Projeto: <span className="font-semibold">{nome}</span> —{" "}
        <a
          href={url}
          target="_blank"
          className="text-blue-600 underline font-medium"
        >
          ver projeto
        </a>
      </p>
    </div>
  );
}
