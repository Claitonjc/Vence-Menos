import {
    Container,
    ContainerCadastro,
    Form,
    Label,
    FormContainer,
    TextCadastro,
} from "./styles";
import { ArrowBack } from "../../components/ArrowBack";
import { useState } from "react";
import { PopUp } from "../../components/PopUp";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ImageContainer } from "../../components/Image";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../services/api";

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

export const Cadastro = () => {
  const [popUpVisible, setPopUpVisible] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const response = await api.post("users", formData);
      if (response.status === 201) {
        setPopUpVisible(true);
      } else {
        console.error("Erro ao salvar os dados");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <Container>
      <Link to="/">
        <ArrowBack />
      </Link>

      {popUpVisible && (
        <PopUp variant="primary" text="Cadastro efetuado com sucesso!">
          <Button
            variant="secondary"
            type="button"
            title="Ok"
            onClick={() => {
              setPopUpVisible(false);
              navigate("/");
            }}
          ></Button>
        </PopUp>
      )}

      <ContainerCadastro>
        <ImageContainer
          positionTwo="primary"
          variant="primary"
          src="https://cdn-icons-png.flaticon.com/512/5087/5087847.png"
          alt="Logo  do aplicativo Venci Menos"
        />
        <TextCadastro>Cadastro</TextCadastro>

        <FormContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="email">E-mail:</Label>
            <Input
              name="email"
              type="email"
              placeholder="Insira seu e-mail"
              errorMessage={errors?.email?.message}
              control={control}
            />
            <Label htmlFor="senha">Senha:</Label>
            <Input
              name="senha"
              type="password"
              placeholder="Insira sua senha"
              errorMessage={errors?.senha?.message}
              control={control}
            />
            <Button variant="primary" type="submit" title="Cadastrar"></Button>
          </Form>
        </FormContainer>
        
      </ContainerCadastro>
    </Container>
  );
};

export default Cadastro;
