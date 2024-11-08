import {
  Container,
  LogoContainer,
  ContainerProduto,
  TitleProduto,
  DadosDoProduto,
  Label,
  ContainerItem,
  ContainerTroca,
  InfoTroca,
  CheckTroca
} from "./styles";
import { ImageContainer } from "../../components/Image";
import { ArrowBack } from "../../components/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useLoja } from "../../hooks/LojaContext";

export const InfoProduto = () => {

  const navigate = useNavigate();

  const { produtoSelecionado } =
    useLoja();
 
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const dataAjustada = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
      
      const dataFormatada = dataAjustada.toLocaleDateString('pt-BR');

      const dateParts = dataFormatada.split('/');

      return `${dateParts[0]}  /  ${dateParts[1]} / ${dateParts[2]}`;
    }

    const handleVoltar = () => {
      navigate(-1);
    }

  return (
    <Container>
      
        <ArrowBack onClick={handleVoltar}/>
      
      <LogoContainer>
        <ImageContainer
          variant="secondary"
          src="https://cdn-icons-png.flaticon.com/512/5087/5087847.png"
          alt="Logo  do aplicativo Venci Menos"
        />
      </LogoContainer>

      <TitleProduto variant="secondary">Informações do item</TitleProduto>

      <ContainerProduto>
        <ContainerItem>
            <Label htmlFor="descricao" variant='primary'>Descrição do produto</Label>
            <DadosDoProduto name="descricao" variant='primary'>
            {produtoSelecionado.descricao}
            </DadosDoProduto>
        </ContainerItem>

        <ContainerItem>
            <Label htmlFor="codigo" variant='primary'>Código</Label>
            <DadosDoProduto name='codigo' variant='primary'>{produtoSelecionado.codigo}</DadosDoProduto>
        </ContainerItem>

        <ContainerItem>
            <Label htmlFor="validade" variant='primary'>Data de validade</Label>
            <DadosDoProduto name='validade'>{formatDate(produtoSelecionado.validade)}</DadosDoProduto>
        </ContainerItem>

        {produtoSelecionado.comTroca && (
            <ContainerTroca>
                <Label htmlFor="comtroca">Com troca</Label>
                <InfoTroca name='comTroca'/>
                <CheckTroca />
            </ContainerTroca>
        )}
        {produtoSelecionado.semTroca && (
            <ContainerTroca>
                <Label htmlFor="semtroca">Sem troca</Label>
                <InfoTroca name='semTroca'/>
                <CheckTroca />
            </ContainerTroca>
        )}
      </ContainerProduto>
    </Container>
  );
};

export default InfoProduto;
