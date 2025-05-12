"use client"

import { useState, useEffect } from "react"
import { calcularMediaAvaliacoes, obterTotalAvaliacoes } from "../services/avaliacaoServices"

interface UseFilmeAvaliacaoRetorno {
  mediaAvaliacoes: number
  totalAvaliacoes: number
  loading: boolean
  error: string | null
}

export function useFilmeAvaliacao(filmeId: number | null | undefined): UseFilmeAvaliacaoRetorno {
  const [mediaAvaliacoes, setMediaAvaliacoes] = useState<number>(0)
  const [totalAvaliacoes, setTotalAvaliacoes] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      if (!filmeId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        // Usando suas funções existentes do avaliacoesServices.ts
        const [media, total] = await Promise.all([calcularMediaAvaliacoes(filmeId), obterTotalAvaliacoes(filmeId)])

        setMediaAvaliacoes(media)
        setTotalAvaliacoes(total)
      } catch (error) {
        console.error("Erro ao buscar avaliações do filme:", error)
        setError("Não foi possível carregar as avaliações")
      } finally {
        setLoading(false)
      }
    }

    fetchAvaliacoes()
  }, [filmeId])

  return { mediaAvaliacoes, totalAvaliacoes, loading, error }
}
