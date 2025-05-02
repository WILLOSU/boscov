"use client"

import { useContext, useEffect, useState, useCallback } from "react"
import { UserContext } from "../../Context/UserContext"
import {
  ProfileActions,
  ProfileAvatar,
  ProfileBackground,
  ProfileContainer,
  ProfileHeader,
  ProfileIconAdd,
  ProfileIconEdit,
  ProfileUser,
  ProfileFilmes,
} from "./ProfileStyled"
import { getAllPostsByUser } from "../../services/filmesServices"
import { Card } from "../../components/Card/Card"
import type { Filme } from "../../Datas"
import { Link } from "react-router-dom"
import { validateFilmeData } from "../../utils/data-validator" // Importe a função de validação

export function Profile() {
  const { user } = useContext(UserContext)
  const [posts, setPosts] = useState<Filme[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const findAllPostsByUser = useCallback(async () => {
    try {
      setIsLoading(true)

      // Verificar se o usuário existe e tem um ID
      if (!user || !user.id) {
        setError("Usuário não encontrado ou sem ID válido")
        setIsLoading(false)
        return
      }

      const filmesData = await getAllPostsByUser(user.id)

      // Valida e normaliza cada filme antes de atualizar o estado
      const validatedFilmes = Array.isArray(filmesData) ? filmesData.map((filme) => validateFilmeData(filme)) : []

      setPosts(validatedFilmes)
      setError(null)
    } catch (err) {
      console.error("Erro ao buscar posts do usuário:", err)
      setError("Falha ao carregar os posts do usuário")
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }, [user]) // Dependência do useCallback

  useEffect(() => {
    findAllPostsByUser()
  }, [findAllPostsByUser]) // Dependência do useEffect

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileIconEdit>
          <i className="bi bi-pencil-square"></i>
        </ProfileIconEdit>
        <ProfileBackground src="https://i.imgur.com/8o4IBRg.png" alt="Background do perfil" />
        {user && (
          <ProfileUser>
            <ProfileAvatar src="https://i.imgur.com/xmI2QAo.jpg" alt="Foto do usuário" />
            <h2>{user.nome}</h2>
            <h3>{user.email}</h3>
          </ProfileUser>
        )}
        <ProfileActions>
          <Link to="/manage-filmes/add">
            <ProfileIconAdd>
              <i className="bi bi-plus-circle"></i>
            </ProfileIconAdd>
          </Link>
        </ProfileActions>
      </ProfileHeader>

      <ProfileFilmes>
        {isLoading ? (
          <p>Carregando Filmes...</p>
        ) : error ? (
          <p>{error}</p>
        ) : posts.length === 0 ? (
          <p>Nenhum Filme encontrado</p>
        ) : (
          posts.map((filme) => <Card key={filme.id || Math.random()} filme={filme} />)
        )}
      </ProfileFilmes>
    </ProfileContainer>
  )
}

export default Profile
