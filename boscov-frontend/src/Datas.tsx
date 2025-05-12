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
      id: number;
      descricao: string;
    };
  }[];
  title?: string; // Adicione esta linha
}

export interface AvaliacaoFrontend {
  id: number;
  idUsuario: number;
  idFilme: number;
  nota: number;
  comentario?: string;
  usuario?: {
    id: number;
    nome: string;
    apelido?: string;
  };
  estrelas?: number; // Opcional
}

export interface AvaliarFilmePayload {
  filmeId?: number | string; // Se o ID pode ser string também
  nota: number; // Removi a possibilidade de null ou undefined
  comentario?: string | null | undefined;
}

export interface AvaliacaoFilmeProps {
  filmeId: string;
  // Opcional: notaInicial?: number | null;
  // Opcional: comentarioInicial?: string | null;
}