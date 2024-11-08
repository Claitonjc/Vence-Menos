import {
  Container,
  LogoContainer,
  Title,
  ContainerConfig,
  ContainerInputs,
  TitleConfig,
  BellIcon,
  CalendarIcon,
  Labels,
} from "./styles";
import { ImageContainer } from "../../components/Image";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack } from "../../components/ArrowBack";
import { InputInsert } from "../../components/InputInsert";
import { Button } from "../../components/Button";
import { useLoja } from "../../hooks/LojaContext";
import { api } from "../../services/api";

export const Configuracoes = () => {
  const navigate = useNavigate();

  const {
    idUsuario,
    produtoSemTroca,
    setProdutoSemTroca,
    periodoDeRecolhimento,
    setPeriodoDeRecolhimento,
  } = useLoja();

  const onSubmit = async () => {
    try {
      const response = await api.get(`/users/${idUsuario}`);
      const infoUsuario = response.data || [];

      const configuracoes = {
        avisoProdutosSemTroca: produtoSemTroca,
        periodoDeRecolhimento: periodoDeRecolhimento,
      };

      const usuarioAtualizado = { ...infoUsuario, configuracoes };

      const patchResponse = await api.patch(
        `/users/${idUsuario}`,
        usuarioAtualizado
      );

      if (patchResponse.status === 200) {
        console.log("Configuração realizada");
        navigate("/cadastrarlojas");
      } else {
        console.error("Erro ao atualizar os dados");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Container>
      <Link to="/cadastrarlojas">
        <ArrowBack />
      </Link>

      <LogoContainer>
        <ImageContainer
          variant="secondary"
          src="https://cdn-icons-png.flaticon.com/512/5087/5087847.png"
          alt="Logo  do aplicativo Venci Menos"
        />
      </LogoContainer>

      <ContainerConfig onSubmit={handleSubmit}>
        <Title>Configurações</Title>

        <ContainerInputs>
          <BellIcon />
          <TitleConfig variant="secondary">Produtos sem troca</TitleConfig>

          <div>
            <InputInsert
              variant="secondary"
              name="inputTroca"
              value={produtoSemTroca}
              onChange={(e) => setProdutoSemTroca(e.target.value)}
            ></InputInsert>
            <Labels htmlFor="inputTroca">dias antes do vencimento</Labels>
          </div>

          <CalendarIcon />

          <TitleConfig>Periodo de recolhimento</TitleConfig>
          <div>
            <InputInsert
              variant="secondary"
              name="inputRecolhimento"
              value={periodoDeRecolhimento}
              onChange={(e) => setPeriodoDeRecolhimento(e.target.value)}
            ></InputInsert>
            <Labels htmlFor="inputRecolhimento">
              dias antes do vencimento
            </Labels>
          </div>
          
        </ContainerInputs>
        <Button type="submit" variant="primary" title="Salvar"></Button>
      </ContainerConfig>
    </Container>
  );
};
