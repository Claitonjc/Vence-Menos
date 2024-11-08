import {
  Container,
  LogoContainer,
  ContainerProdutos,
  TitleProduto,
  ContainerItem,
  Produto,
  ProdutosLista,
} from "./styles";
import { ArrowBack } from "../../components/ArrowBack";
import { Link } from "react-router-dom";
import { ImageContainer } from "../../components/Image";
import { useLoja } from "../../hooks/LojaContext";
import { useEffect, useState } from "react";
import { Edit } from "../../components/Edit";
import { TrashButton } from "../../components/TrashButton";

export const Pesquisa = () => {
  const {
    listaProdutos,
    searchTermDescription,
    searchTermCode,
    departamentoSelecionado,
  } = useLoja();
  
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const results = listaProdutos.filter((produto) => {
        
        return (
            produto.descricao.toLowerCase().includes(searchTermDescription.toLowerCase()) &&
            produto.codigo.toLowerCase().includes(searchTermCode.toLowerCase())
        );
    });
    
    setFilteredData(results);
}, [searchTermDescription, searchTermCode, listaProdutos]);

  return (
    <Container>
      <Link to="/departamentos">
        <ArrowBack />
      </Link>

      <LogoContainer variant="primary">
        <ImageContainer
          variant="secondary"
          src="https://cdn-icons-png.flaticon.com/512/5087/5087847.png"
          alt="Logo  do aplicativo Venci Menos"
        />
      </LogoContainer>

      <ContainerProdutos>
        <TitleProduto variant="secondary">
          {departamentoSelecionado.nome}
        </TitleProduto>

        <ProdutosLista>
          {filteredData.map((produto, index) => (
            <ContainerItem key={index}>
              <Produto
                key={index}
              >
                {produto.descricao}
              </Produto>
              <Edit
                // onClick={() => {
                //   setDescricaoProduto(produto.descricao);
                //   setCodigoProduto(produto.codigo);
                //   setValidadeProduto(produto.validade);
                //   setEditandoProdutoId(produto.id);
                //   setInputVisible(true);
                //   setPlusVisible(false);
                // }}
              />
              <TrashButton
                // onClick={() => {
                //   setProdutoSelecionado(produto.id);
                //   setpopUpVisibleThree(true);
                // }}
              />
            </ContainerItem>
          ))}
        </ProdutosLista>
      </ContainerProdutos>
    </Container>
  );
};

export default Pesquisa;
