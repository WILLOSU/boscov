


export interface Filme {
  id?: number; 
  nome: string;
  title?: string; 
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
    title: "O Poderoso Chefão", // Adicionado para compatibilidade
    sinopse: "A história da família mafiosa Corleone, liderada por Don Vito, que luta para manter o poder em meio a traições e disputas violentas.",
    poster: "https://image.tmdb.org/t/p/original/uP46DujkD3nwcisOjz9a0Xw0Knj.jpg",
    classificacao: "18 anos",
    duracao: "2h 55min",
    genero: "Crime, Drama",
    nota: "9.2",
    comentario: "Um clássico absoluto, com atuações memoráveis e direção impecável."
  },
  
];