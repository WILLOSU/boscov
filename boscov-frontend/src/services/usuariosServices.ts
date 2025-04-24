import axios from "axios";


// Remover confirmPassword da interface SignupData
export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string; 
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
  dataNascimento: new Date().toISOString()
};


  try {
    const response = await axios.post(`${baseUrl}/users`, requestBody);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao cadastrar o usuário:", error.response?.data || error.message);
      throw error;
    } else {
      console.error("Erro desconhecido:", error);
      throw new Error("Erro desconhecido ao cadastrar o usuário.");
    }
  }
}

function generateUserName(name: string): string {
  const nameLowerCaseWithoutSpaces = name.replace(/\s/g, "").toLowerCase();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${nameLowerCaseWithoutSpaces}-${randomNumber}`;
}
