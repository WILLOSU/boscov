// Interface para definir o tipo de um filme
interface Filme {
  nome: string;
  sinopse: string;
  poster: string;
  classificacao: string;
  duracao: string;
  genero: string;
  nota: string;
  comentario: string;
}

// Array de filmes tipado
export const filmes: Filme[] = [
  {
    nome: "O Poderoso Chefão",
    sinopse: "A história da família mafiosa Corleone, liderada por Don Vito, que luta para manter o poder em meio a traições e disputas violentas.",
    poster: "https://image.tmdb.org/t/p/original/uP46DujkD3nwcisOjz9a0Xw0Knj.jpg",
    classificacao: "18 anos",
    duracao: "2h 55min",
    genero: "Crime, Drama",
    nota: "9.2",
    comentario: "Um clássico absoluto, com atuações memoráveis e direção impecável."
  },
  {
    nome: "Titanic",
    sinopse: "Um romance improvável floresce a bordo do trágico navio Titanic, entre Jack e Rose.",
    poster: "https://image.tmdb.org/t/p/original/MlnPG3oxhfmuiDwcoeElQWui9m.jpg",
    classificacao: "12 anos",
    duracao: "3h 14min",
    genero: "Drama, Romance",
    nota: "7.9",
    comentario: "Uma história emocionante com uma das maiores bilheterias da história do cinema."
  },
  {
    nome: "Interestelar",
    sinopse: "Astronautas viajam por um buraco de minhoca em busca de um novo lar para a humanidade.",
    poster: "https://image.tmdb.org/t/p/original/p6wYy2mUsOwi4TalNAk46ft4sVJ.jpg",
    classificacao: "10 anos",
    duracao: "2h 49min",
    genero: "Ficção Científica, Aventura",
    nota: "8.6",
    comentario: "Uma viagem épica sobre amor, tempo e o desconhecido."
  },
  {
    nome: "Vingadores: Ultimato",
    sinopse: "Após o estalo de Thanos, os Vingadores se unem para tentar reverter os danos e salvar o universo.",
    poster: "https://image.tmdb.org/t/p/original/4QCLUbCsOTvBq4iuvxG1I74XVoS.jpg",
    classificacao: "12 anos",
    duracao: "3h 1min",
    genero: "Ação, Aventura",
    nota: "8.4",
    comentario: "Um final épico para mais de uma década de filmes da Marvel."
  },
  {
    nome: "Coringa",
    sinopse: "Arthur Fleck, um comediante falido, mergulha na loucura e se transforma no icônico vilão Coringa.",
    poster: "https://image.tmdb.org/t/p/original/tBvR4eJGb81CYYpc6uWrJMkLwd1.jpg",
    classificacao: "16 anos",
    duracao: "2h 2min",
    genero: "Drama, Suspense",
    nota: "8.4",
    comentario: "Impactante, perturbador e com uma atuação brilhante de Joaquin Phoenix."
  },
  {
    nome: "Parasita",
    sinopse: "Uma família pobre se infiltra na casa de uma família rica, revelando tensões de classe e consequências inesperadas.",
    poster: "https://image.tmdb.org/t/p/original/pV2PVFWHUuX3LZ83DhNXKAjyqY4.jpg",
    classificacao: "16 anos",
    duracao: "2h 12min",
    genero: "Drama, Suspense",
    nota: "8.6",
    comentario: "Obra-prima sul-coreana que venceu o Oscar de Melhor Filme."
  },
  {
    nome: "Forrest Gump",
    sinopse: "A incrível jornada de Forrest Gump, um homem simples com um coração puro que testemunha eventos históricos dos EUA.",
    poster: "https://image.tmdb.org/t/p/original/lsn4YWMiwkN0Ijsj2oE81OmODFA.jpg",
    classificacao: "12 anos",
    duracao: "2h 22min",
    genero: "Drama, Romance",
    nota: "8.8",
    comentario: "Inspirador, com uma atuação icônica de Tom Hanks."
  },
  {
    nome: "A Origem",
    sinopse: "Um ladrão que invade sonhos é contratado para implantar uma ideia na mente de um CEO.",
    poster: "https://image.tmdb.org/t/p/original/4VWZyyUTuOZGcamFWfdo9EccuQJ.jpg",
    classificacao: "14 anos",
    duracao: "2h 28min",
    genero: "Ficção Científica, Ação",
    nota: "8.8",
    comentario: "Complexo e inovador, com visual impressionante e roteiro envolvente."
  },
  {
    nome: "Gladiador",
    sinopse: "Um general romano é traído e se torna escravo, buscando vingança contra o imperador que destruiu sua vida.",
    poster: "https://image.tmdb.org/t/p/original/r1CesMGmV4EKauh5c7PtXBjWBZj.jpg",
    classificacao: "16 anos",
    duracao: "2h 35min",
    genero: "Ação, Drama",
    nota: "8.5",
    comentario: "Épico, emocionante e com trilha sonora inesquecível."
  },
  {
    nome: "Homem-Aranha: Sem Volta Para Casa",
    sinopse: "Peter Parker lida com as consequências da revelação de sua identidade, abrindo o multiverso.",
    poster: "https://image.tmdb.org/t/p/original/xn5l5fdj158192a7E73A25EdBS0.jpg",
    classificacao: "12 anos",
    duracao: "2h 28min",
    genero: "Ação, Aventura",
    nota: "8.3",
    comentario: "Um evento nostálgico e empolgante para os fãs do herói."
  }
];