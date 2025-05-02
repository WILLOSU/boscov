// Interfaces específicas para os objetos
export interface SinopseObject {
  descricao: string
  id?: number | string
  
}

export interface ComentarioObject {
  id: number | string
  texto?: string
  
}

export interface Filme {
  id?: number
  nome: string
  title?: string
  sinopse: string | SinopseObject
  poster: string
  classificacao: string
  duracao: string
  genero: string
  nota: string
  comentario: string | ComentarioObject
}
