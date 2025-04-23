
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { AuthContainer, Section } from "./AuthenticationStyled";
////import { zodResolver } from "@hookform/resolvers/zod";
////import { SearchFormData, signupSchema, signinSchema } from "./schemas"; 


export function Authentication() {
// dois componentes em formulário
// utilizei apelido na desustruração de objetos

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
   // formState: { errors: errorsSignup },
  } = useForm();

  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
   // formState: { errors: errorsSignin },
  } = useForm();

  function inHanleSubmit (data: unknown){
    console.log(data);
  }

  function upHanleSubmit (data: unknown){
    console.log(data);
  }

  return (
    <AuthContainer>
      <Section type="signin">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmitSignin(inHanleSubmit)}>
          <Input type="email" placeholder="E-mail" name="email" register={registerSignin}/>
          <Input type="password" placeholder="Senha" name="password"register={registerSignin}/>
          <Button type="submit" variant="signin">Acessar Conta</Button>


        </form>
      </Section>
      <Section type="signup">
        <h2>Cadastrar</h2>
        <form onSubmit={handleSubmitSignup(upHanleSubmit)}>
          <Input type="text" placeholder="Nome" name="name" register={registerSignup}/>
          <Input type="email" placeholder="E-mail" name="email" register={registerSignup}/>
          <Input type="password" placeholder="Senha" name="password" register={registerSignup}/>
          <Input
            type="password"
            placeholder="Confirmar Senha"
            name="password"
            register={registerSignup}
            />
          <Button type="submit" variant="signup">Criar Conta</Button>

        </form>
      </Section>
    </AuthContainer>
  );
}


export default Authentication;
