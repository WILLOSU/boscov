import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Navbar } from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import { Search } from "./pages/Search/Search"
import { GlobalStyled } from "./GlobalStyled"
import ErrorPage from "./pages/ErrorPage/ErrorPage"
import Authentication from "./pages/Authentication/Authentication"
import Profile from "./pages/Profile/Profile"
import UserProvider from "./Context/UserContext"
import { ManageFilmes } from "./pages/ManageFilmes/ManageFilmes"
import { ComentarioFilme } from "./pages/ComentarioFilme/ComentarioFilme"
import { AvaliacaoEstrelas } from "./pages/NotasFilmes/NotasFilmes"

// Definindo as rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />, // Navbar tem o <Outlet /> carrega rotas filhas
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search/:title",
        element: <Search />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/manage-filmes/:action",
        element: <ManageFilmes />,
      },

      {
        path: "/manage-filmes/:action/:id",
        element: <ManageFilmes />,
      },

      {
        path: "/filme/:id/comentario/:action",
        element: <ComentarioFilme />,
      },

      {
        path: "/filme/:id/comentario/:action/:comentarioId",
        element: <ComentarioFilme />,
      },

      {
        path: "/filme/:id/avaliar",
        element: <AvaliacaoEstrelas />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Authentication />,
  },
])

// Renderizando o app com estilos globais e router
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyled />
    <UserProvider>
      <RouterProvider router={router} /> {/*tds (fihos) componentes  da aplicação */}
    </UserProvider>
  </React.StrictMode>,
)
