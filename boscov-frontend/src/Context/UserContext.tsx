import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    ReactNode,
  } from "react";
  
  export interface UserData {
    id: number;
    nome: string;
    email: string;
    username?: string;  
    avatar?: string;   
    background?: string;
  }
  
  export interface UserContextType {
    user: UserData | null;
    setUser: Dispatch<SetStateAction<UserData | null>>;
  }
  
  // Criando o contexto com um valor padrão
  // eslint-disable-next-line react-refresh/only-export-components
  export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
  });
  
  interface UserProviderProps {
    children: ReactNode;
  }
  
  // Componente Provider
  const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);// estado global
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };

  // herda de userContext o meu user e o setUser que é o meu estado
  // para os meus filhos {children} que eu receber aqui!! #59
  export default UserProvider;