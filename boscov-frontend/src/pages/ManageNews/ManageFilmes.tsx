"use client"

import { useNavigate, useParams } from "react-router-dom"
import { AddFilmesContainer } from "./ManageFilmesStyled"
import { zodResolver } from "@hookform/resolvers/zod"
import type { FilmeFormValues, FilmesData } from "../../components/Interface/Types"
import { useForm } from "react-hook-form"
import { Input } from "../../components/Input/Input"
import { ErrorSpan } from "../../components/Navbar/NavbarStyled"
import { Button } from "../../components/Button/Button"
import { createFilmes, getFilmesById, updateFilme } from "../../services/filmesServices"
import { useEffect, useState } from "react"
import { filmesSchema } from "../../schemas/filmesSchema"

export function ManageFilmes() {
  const { action, id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register: registerFilmes,
    handleSubmit: handleRegisterFilmes,
    formState: { errors: errosRegisterFilmes },
    setValue,
  } = useForm<FilmeFormValues>({
    resolver: zodResolver(filmesSchema),
    defaultValues: {
      usuarioCriador: 1, // Valor padrão para usuarioCriador
    },
  })

  useEffect(() => {
    async function fetchFilmeData() {
      if (action === "edit" && id) {
        try {
          setLoading(true)
          const filme = await getFilmesById(id)

          setValue("nome", filme.nome)
          setValue("poster", filme.poster)
          setValue("sinopse", filme.sinopse)
          setValue("diretor", filme.diretor)
          setValue("anoLancamento", String(filme.anoLancamento))
          setValue("duracao", String(filme.duracao))
          setValue("produtora", filme.produtora)
          setValue("classificacao", String(filme.classificacao))
          setValue("generoId", String(filme.generoId))
          setValue("status", String(filme.status))
          setValue("generoDescricao", filme.generoDescricao)
          setValue("usuarioCriador", filme.usuarioCriador)
        } catch (error) {
          console.error("Erro ao buscar dados do filme:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchFilmeData()
  }, [action, id, setValue])

  // Função para converter FilmeFormValues para FilmesData
  function convertToFilmesData(data: FilmeFormValues): FilmesData {
    return {
      ...data,
      anoLancamento: Number(data.anoLancamento),
      duracao: Number(data.duracao),
      classificacao: Number(data.classificacao),
      generoId: Number(data.generoId),
      status: Number(data.status),
      // usuarioCriador já é um número
    }
  }

  async function registerFilmesSubmit(data: FilmeFormValues) {
    try {
      setLoading(true)
      const filmeDataToSend = convertToFilmesData(data)
      await createFilmes(filmeDataToSend)
      navigate("/profile")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function editFilmesSubmit(data: FilmeFormValues) {
    if (!id) return

    try {
      setLoading(true)
      const filmeDataToSend = convertToFilmesData(data)
      await updateFilme(id, filmeDataToSend)
      navigate("/profile")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AddFilmesContainer>
      <h2>{action === "add" ? "Adicionar" : "Atualizar"} Filmes</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <form onSubmit={handleRegisterFilmes(action === "add" ? registerFilmesSubmit : editFilmesSubmit)}>
          <Input type="text" placeholder="Nome do Filme" name="nome" register={registerFilmes} />
          {errosRegisterFilmes.nome && <ErrorSpan>{errosRegisterFilmes.nome.message}</ErrorSpan>}

          <Input type="text" placeholder="Poster do Filme" name="poster" register={registerFilmes} />

          <Input placeholder="Sinopse" name="sinopse" register={registerFilmes} isInput={false} />
          {errosRegisterFilmes.sinopse && <ErrorSpan>{errosRegisterFilmes.sinopse.message}</ErrorSpan>}

          <Input type="text" placeholder="Diretor" name="diretor" register={registerFilmes} />
          {errosRegisterFilmes.diretor && <ErrorSpan>{errosRegisterFilmes.diretor?.message}</ErrorSpan>}

          <Input type="number" placeholder="Ano de Lançamento" name="anoLancamento" register={registerFilmes} />
          {errosRegisterFilmes.anoLancamento && <ErrorSpan>{errosRegisterFilmes.anoLancamento.message}</ErrorSpan>}

          <Input type="number" placeholder="Duração (em minutos)" name="duracao" register={registerFilmes} />
          {errosRegisterFilmes.duracao && <ErrorSpan>{errosRegisterFilmes.duracao.message}</ErrorSpan>}

          <Input type="text" placeholder="Produtora" name="produtora" register={registerFilmes} />
          {errosRegisterFilmes.produtora && <ErrorSpan>{errosRegisterFilmes.produtora.message}</ErrorSpan>}

          <Input type="number" placeholder="Classificação Indicativa" name="classificacao" register={registerFilmes} />
          {errosRegisterFilmes.classificacao && <ErrorSpan>{errosRegisterFilmes.classificacao.message}</ErrorSpan>}

          <Input type="number" placeholder="ID do Gênero" name="generoId" register={registerFilmes} />
          {errosRegisterFilmes.generoId && <ErrorSpan>{errosRegisterFilmes.generoId.message}</ErrorSpan>}

          <Input type="number" placeholder="Status (1 = Ativo, 2 = Inativo)" name="status" register={registerFilmes} />
          {errosRegisterFilmes.status && <ErrorSpan>{errosRegisterFilmes.status.message}</ErrorSpan>}

          {action === "edit" && (
            <Input
              type="text"
              placeholder="Gênero (Descrição)"
              name="generoDescricao"
              register={registerFilmes}
              disabled
            />
          )}

          {/* Campo oculto para usuarioCriador */}
          <input type="hidden" {...registerFilmes("usuarioCriador")} />

          <Button type="submit" disabled={loading}>
            {action === "add" ? "Adicionar" : "Atualizar"}
          </Button>
        </form>
      )}
    </AddFilmesContainer>
  )
}
