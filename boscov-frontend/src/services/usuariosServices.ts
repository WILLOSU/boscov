import axios from "axios";
import Cookies from "js-cookie";

// Remover confirmPassword da interface SignupData
export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}


export interface SigninData {
  email: string;
  password: string;
}

const baseUrl: string = "http://localhost:3000";

export async function signup(data: SignupData & { confirmPassword: string }) {
  if (data.password !== data.confirmPassword) {
    throw new Error("As senhas não coincidem!");
  }

  const { name, email, password } = data;

  const requestBody = {
    nome: name,
    email: email,
    senha: password,
    apelido: generateUserName(name),
    avatar: "https://i.imgur.com/xmI2QAo.jpg",
    background: "https://i.imgur.com/XbRg9D7.png",
    tipoUsuarioId: 1,
    dataNascimento: new Date().toISOString(),
  };

  try {
    const response = await axios.post(`${baseUrl}/users`, requestBody);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro ao cadastrar o usuário:",
        error.response?.data || error.message
      );
      throw error;
    } else {
      console.error("Erro desconhecido:", error);
      throw new Error("Erro desconhecido ao cadastrar o usuário.");
    }
  }
}

// SIGNIN
export async function signin(data: SigninData) {
  const { email, password } = data;

  const requestBody = {
    email: email,
    password: password, // A chave deve ser 'password' de acordo com o backend
  };

  try {
    const response = await axios.post(`${baseUrl}/auth`, requestBody);

    // Certifique-se de que o token está no response.data.token
    if (response.status === 200 && response.data.token) {
      return response.data; // Retorna o token diretamente
    } else {
      throw new Error(`Erro ao fazer login: Status ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro ao fazer login:",
        error.response?.data || error.message
      );
      throw error;
    } else {
      console.error("Erro desconhecido no login:", error);
      throw new Error("Erro desconhecido ao fazer login.");
    }
  }
}

export function userLogged() {
  const response = axios.get(`${baseUrl}/users/getById`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
// Função para gerar o nome de usuário com base no nome
function generateUserName(name: string): string {
  const nameLowerCaseWithoutSpaces = name.replace(/\s/g, "").toLowerCase();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${nameLowerCaseWithoutSpaces}-${randomNumber}`;
}
