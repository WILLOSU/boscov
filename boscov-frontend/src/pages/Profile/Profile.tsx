import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Navigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { user } = useContext(UserContext);

  // Se não houver usuário logado, redireciona para a página inicial
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <p>ID: {user.id}</p>
      <p>Nome: {user.nome}</p>
      <p>Email: {user.email}</p>
      {/* Adicione mais informações do perfil conforme necessário */}
    </div>
  );
};

export default Profile;