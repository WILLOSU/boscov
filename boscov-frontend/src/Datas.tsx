// Datas.tsx

// Interfaces específicas para os objetos
export interface SinopseObject {
  omentario: string | ComentarioObject; // 'omentario' parece um erro de digitação, talvez seja 'comentario'?
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
  title?: string;
  sinopse: string | SinopseObject;
  poster: string;
  classificacao: string;
  duracao: string;
  genero: string;
  nota: string;
  comentario: string | ComentarioObject; 
  genero_filme?: {
    genero: {
      id?: number;
      descricao: string;
    };
  }[];
}