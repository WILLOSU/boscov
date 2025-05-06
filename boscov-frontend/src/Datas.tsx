// Datas.tsx

// Interfaces específicas para os objetos
export interface SinopseObject {
  omentario: string | ComentarioObject;
  descricao: string;
  id?: number | string;
}

export interface ComentarioObject {
  id: number | string;
  texto?: string;
}

export interface Filme {
  id?: number;
  nome: string;
  sinopse: string | SinopseObject;
  poster: string;
  classificacao: string;
  duracao: string;
  genero: string;
  nota: string;
  comentario: string | ComentarioObject;
  genero_filme?: {
    genero: {
      id: number; // <--- REMOVEU O '?' TORNANDO 'id' OBRIGATÓRIO
      descricao: string;
    };
  }[];
}