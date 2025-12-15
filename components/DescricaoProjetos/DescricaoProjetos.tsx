import Projeto from "@/components/Projeto/Projeto";

// Componente simples em que guardamos projetos e os seus respetivos links 
export default function DescricaoProjetos() {
  return (
    <section className="space-y-6">
      <p className="text-lg">
        Ao longo desta disciplina desenvolvi vários projetos interativos, tanto
        em HTML/CSS como JavaScript e React.  
        Podes ver todos os meus projetos entre nestes links ou no meu Git em:
        <a
          href="https://github.com/guilherme-coelho-a22405805"
          target="_blank"
          className="text-black underline ml-2"
        >
          GitHub
        </a>
      </p>

      <div className="space-y-4">
        <Projeto
          nome="Loja com produtos"
          url="https://guilherme-coelho-a22405805.github.io/a22405805GuilhermeCoelho.github.io/lab7/index.html"
        />

        <Projeto
          nome="Website com JavaScript Interativo"
          url="https://guilherme-coelho-a22405805.github.io/a22405805GuilhermeCoelho.github.io/lab5/index.html"
        />

        <Projeto
          nome="Portfolio / Homepage"
          url="https://guilherme-coelho-a22405805.github.io/a22405805GuilhermeCoelho.github.io"
        />

      </div>
    </section>
  );
}
