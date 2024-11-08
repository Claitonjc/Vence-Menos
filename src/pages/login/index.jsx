import {
  Container,
  ContainerLogin,
  Form,
  Label,
  LinkCadastro,
  TextLogin,
} from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ImageContainer } from "../../components/Image";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { PopUp } from "../../components/PopUp";
import { useState } from "react";
import { useLoja } from "../../hooks/LojaContext";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email não é valido")
      .required("Campo obrigatório"),
    senha: yup
      .string()
      .min(4, "No minimo 4 caracteres")
      .required("Campo obrigatório"),
  })
  .required();

export const Login = () => {
  const { setIdUsuario } = useLoja();
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [emailState, setEmailState] = useState("");
  const [senhaState, setSenhaState] = useState("");

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (loginData) => {
    try {
      const { data } = await api.get(
        `users?email=${loginData.email}&senha=${loginData.senha}`
      );
      if (data.length > 0) {
        setIdUsuario(data[0].id);
        navigate("/cadastrarlojas");
      } else {
        setPopUpVisible(true);
        console.error("Usuário não cadastrado");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <Container>
      {popUpVisible && (
        <PopUp variant='primary' text="Usuário não cadastrado">
          <Button
            title="Ok"
            onClick={() => {
              setPopUpVisible(false);
              reset({
                email: "",
                senha: "",
              });
            }}
          ></Button>
        </PopUp>
      )}

      <ContainerLogin>
        <ImageContainer
          variant="primary"
          position="primary"
          src="https://cdn-icons-png.flaticon.com/512/5087/5087847.png"
          alt="Logo  do aplicativo Venci Menos"
        />

        <TextLogin>Login</TextLogin>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">E-mail:</Label>
          <Input
            variant="primary"
            name="email"
            type="email"
            placeholder="Insira seu e-mail"
            value={emailState}
            onChange={(e) => setEmailState(e.target.value)}
            errorMessage={errors?.email?.message}
            control={control}
          />
          <Label htmlFor="senha">Senha:</Label>
          <Input
            variant="primary"
            name="senha"
            type="password"
            placeholder="Insira sua senha"
            value={senhaState}
            onChange={(e) => setSenhaState(e.target.value)}
            errorMessage={errors?.senha?.message}
            control={control}
          />
          <Button variant="primary" type="submit" title="Entrar"></Button>
        </Form>
      </ContainerLogin>
      <Link to="/cadastro">
        <LinkCadastro>Criar conta</LinkCadastro>
      </Link>
    </Container>
  );
};

export default Login;
