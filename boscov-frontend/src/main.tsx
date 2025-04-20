// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import { GlobalStyled } from "./GlobalStyled";
import ErrorPage from "./pages/ErrorPage/ErrorPage";



// Definindo as rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />, // Navbar tem o <Outlet /> carrega rotas filhas
    errorElement:<ErrorPage />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search/:title", 
        element: <Search />,
      },
    ],
  },
]);

// Renderizando o app com estilos globais e router
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyled />
    <RouterProvider router={router} />
  </React.StrictMode>
);
