import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { AuthContainer, Section } from "./AuthenticationStyled";
import signupSchema from "../../schemas/SignupSchema";
import signinSchema from "../../schemas/SigninSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { signup, SignupData } from "../../services/usuariosServices";
import { signin, SigninData } from "../../services/usuariosServices";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Authentication() {
  const [loginError, setLoginError] = useState("");
  const [signupFeedback, setSignupFeedback] = useState<string | null>(null); // Novo estado para feedback de cadastro
  const [signupFeedbackType, setSignupFeedbackType] = useState<
    "success" | "error" | null
  >(null); // Tipo do feedback

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    formState: { errors: errorsSignin },
  } = useForm({ resolver: zodResolver(signinSchema) });

  const navigate = useNavigate();

  async function upHandleSubmit(data: SignupData): Promise<void> {
    setSignupFeedback(null); // Limpa o feedback anterior
    setSignupFeedbackType(null);
    try {
      const response = await signup(data);
      if (response.data && response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1, path: "/" });
        setSignupFeedback("Usuário cadastrado com sucesso!");
        setSignupFeedbackType("success");
        setTimeout(() => {
          navigate("/");
        }, 2000); // Opcional: Redirecionar após alguns segundos
      } else {
        console.error(
          "Token não recebido na resposta de cadastro:",
          response.data
        );
        setSignupFeedback("Erro ao cadastrar: Token inválido recebido.");
        setSignupFeedbackType("error");
      }
    } catch (error: unknown) {
      console.error("Erro durante o cadastro:", error);
      let errorMessage = "Erro desconhecido ao cadastrar.";
      if (error instanceof Error && error.message) {
        errorMessage = `Erro ao cadastrar: ${error.message}`;
      } else if (typeof error === "string") {
        errorMessage = `Erro ao cadastrar: ${error}`;
      }
      setSignupFeedback(errorMessage);
      setSignupFeedbackType("error");
    }
  }

  async function inHandleSubmit(data: SigninData): Promise<void> {
    setLoginError("");
    try {
      const response = await signin(data);

      if (response && response.token) {
        Cookies.set("token", response.token, { expires: 1, path: "/" });
        navigate("/");
      } else {
        console.error("Token não recebido na resposta de login:", response);
        setLoginError("Erro ao fazer login: Token não recebido.");
      }
    } catch (error: unknown) {
      console.log("Erro no login:", error);
      const errorMessage = "Erro ao fazer login. Verifique suas credenciais.";
      if (error instanceof Error && error.message) {
        setLoginError(
          "Senha ou e-mail incorretos. Digite novamente, por favor."
        );
      } else if (typeof error === "string") {
        setLoginError(`Erro ao fazer login: ${error}`);
      } else {
        setLoginError(errorMessage);
      }
    }
  }

  return (
    <AuthContainer>
      <Section type="signin">
        {/* SIGNIN */}
        <h2>Entrar</h2>
        <form onSubmit={handleSubmitSignin(inHandleSubmit)}>
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
          {loginError && (
            <ErrorSpan style={{ color: "red" }}>{loginError}</ErrorSpan>
          )}
          <Button type="submit" variant="signin">
            Acessar Conta
          </Button>
        </form>
      </Section>
      <Section type="signup">
        <h2>Cadastrar</h2>
        <form onSubmit={handleSubmitSignup(upHandleSubmit)}>
          {signupFeedback && (
            <ErrorSpan
              style={{
                color: signupFeedbackType === "success" ? "green" : "red",
              }}
            >
              {signupFeedback}
            </ErrorSpan>
          )}
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
