"use client"

import { useState, useEffect } from "react"
import { getAvaliacao, adicionarAvaliacao, criarNota } from "../services/avaliacaoServices"
import type { AvaliacaoFrontend } from "../components/Interface/Types"

interface UseAvaliacaoUsuarioRetorno {
  avaliacao: AvaliacaoFrontend | null
  loading: boolean
  error: string | null
  avaliar: (nota: number) => Promise<void>
}

// Hook para gerenciar a avaliação do usuário atual para um filme
export function useAvaliacaoUsuario(filmeId: number | string | null | undefined): UseAvaliacaoUsuarioRetorno {
  const [avaliacao, setAvaliacao] = useState<AvaliacaoFrontend | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAvaliacao = async () => {
      if (!filmeId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        // Buscar avaliação do usuário atual
        const avaliacaoData = await getAvaliacao(filmeId)
        setAvaliacao(avaliacaoData)
      } catch (error) {
        console.error("Erro ao buscar avaliação do usuário:", error)
        setError("Não foi possível carregar sua avaliação")
      } finally {
        setLoading(false)
      }
    }

    fetchAvaliacao()
  }, [filmeId])

  // Função para adicionar ou atualizar avaliação
  const avaliar = async (nota: number) => {
    if (!filmeId) {
      setError("ID do filme não fornecido")
      return
    }

    try {
      setLoading(true)
      setError(null)

      let novaAvaliacao: AvaliacaoFrontend

      if (avaliacao) {
        // Atualizar avaliação existente
        novaAvaliacao = await adicionarAvaliacao(filmeId, nota)
      } else {
        // Criar nova avaliação
        novaAvaliacao = await criarNota(filmeId, nota)
      }

      setAvaliacao(novaAvaliacao)
    } catch (error) {
      console.error("Erro ao avaliar filme:", error)
      setError("Não foi possível salvar sua avaliação")
    } finally {
      setLoading(false)
    }
  }

  return { avaliacao, loading, error, avaliar }
}
