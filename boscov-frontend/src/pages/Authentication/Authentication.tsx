import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { AuthContainer, Section } from "./AuthenticationStyled";
import signupSchema from "../../schemas/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { signup, SignupData } from "../../services/usuariosServices";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export function Authentication() {
  // dois componentes em formulário
  // utilizei apelido na desustruração de objetos

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    formState: { errors: errorsSignin },
  }  = useForm({ resolver: zodResolver(signupSchema) });


  function inHanleSubmit(data: unknown) {
    console.log(data);
  }

  const navigate = useNavigate();

  async function upHandleSubmit(data: SignupData): Promise<void> {
    try {
      const response = await signup(data);
      if (response.data && response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1, path: '/' }); // Salva o token como cookie
        navigate('/');
        console.log("Token de cadastro salvo no cookie:", Cookies.get("token"));
      } else {
        console.error("Token não recebido na resposta de cadastro:", response.data);
       
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContainer>
      <Section type="signin">
        {/* SIGNIN */}
        <h2>Entrar</h2>
        <form onSubmit={handleSubmitSignin(inHanleSubmit)}>
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            register={registerSignin}
          />
          {errorsSignin.email && (
            <ErrorSpan>{errorsSignin.email.message}</ErrorSpan>
          )}

          <Input
            type="password"
            placeholder="Senha"
            name="password"
            register={registerSignin}
          />
          {errorsSignin.password && (
            <ErrorSpan>{errorsSignin.password.message}</ErrorSpan>
          )}
          <Button type="submit" variant="signin">
            Acessar Conta
          </Button>
        </form>

        {/* SIGNPU */}
      </Section>
      <Section type="signup">
        <h2>Cadastrar</h2>
        <form onSubmit={handleSubmitSignup(upHandleSubmit)}>
          <Input
            type="text"
            placeholder="Nome"
            name="name"
            register={registerSignup}
          />
          {errorsSignup.name && (
            <ErrorSpan>{errorsSignup.name.message}</ErrorSpan>
          )}
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            register={registerSignup}
          />
          {errorsSignup.email && (
            <ErrorSpan>{errorsSignup.email.message}</ErrorSpan>
          )}
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            register={registerSignup}
          />
          {errorsSignup.password && (
            <ErrorSpan>{errorsSignup.password.message}</ErrorSpan>
          )}
          <Input
            type="password"
            placeholder="Confirmar Senha"
            name="confirmPassword"
            register={registerSignup}
          />
          {errorsSignup.confirmPassword && (
            <ErrorSpan>{errorsSignup.confirmPassword.message}</ErrorSpan>
          )}

          <Button type="submit" variant="signup">
            Criar Conta
          </Button>
        </form>
      </Section>
    </AuthContainer>
  );
}

export default Authentication;
