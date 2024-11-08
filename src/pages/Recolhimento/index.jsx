import {
  Container,
  LogoContainer,
  ContainerProdutos,
  TitleProduto,
  ProdutosLista,
  ContainerItem,
  Produto,
  ContainerAdicionaProduto,
  ContainerInput,
  DivInputs,
  Label,
  SubTitleProduto,
  DivCheckbox,
  DivButtonPopUp,
} from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack } from "../../components/ArrowBack";
import { ImageContainer } from "../../components/Image";
import { api } from "../../services/api";
import { useLoja } from "../../hooks/LojaContext";
import { useState, useEffect } from "react";
import { Edit } from "../../components/Edit";
import { TrashButton } from "../../components/TrashButton";
import { InputInsert } from "../../components/InputInsert";
import { Checkbox } from "../../components/Checkbox";
import { Button } from "../../components/Button";
import { PopUp } from "../../components/PopUp";

export const Recolhimento = () => {

  const navigate = useNavigate();

  const {
    idUsuario,
    lojaSelecionada,
    departamentoSelecionado,
    produtoSelecionado,
    descricaoProduto,
    setDescricaoProduto,
    codigoProduto,
    setCodigoProduto,
    validadeProduto,
    setValidadeProduto,
    checked,
    setChecked,
    setProdutoSelecionado,
  } = useLoja();

  // const [listaProdutos, setListaProdutos] = useState([]);
  const [produtosParaExibir, setProdutosParaExibir] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [editandoProdutoId, setEditandoProdutoId] = useState(null);
  const [popUpVisibleThree, setpopUpVisibleThree] = useState(false);
  const [popUpVisibleTwo, setPopUpVisibleTwo] = useState(false);

  const dataParaRecolhimento = async (dataAtual) => {
    const response = await api.get(`/users/${idUsuario}/`);
    const configuracoes = response.data.configuracoes || [];
    const periodoDeRecolhimento = configuracoes.periodoDeRecolhimento || [];

    const milissegundosEmUmDia = 24 * 60 * 60 * 1000;
    const milissegundosParaAdicionar =
      periodoDeRecolhimento * milissegundosEmUmDia;

    const novaDataCalculada = new Date(
      dataAtual.getTime() + milissegundosParaAdicionar
    );
    novaDataCalculada.toLocaleDateString("pt-Br");
    return novaDataCalculada;
  };

  const ProdutoAdicionado = async () => {
    setInputVisible(false);
    if (editandoProdutoId) {
      await atualizarNomeProduto(editandoProdutoId);
    }
    await buscarProduto();
    setDescricaoProduto("");
    setCodigoProduto("");
    setValidadeProduto("");
    setEditandoProdutoId(null);
  };

  const atualizarNomeProduto = async () => {
    try {
      const response = await api.get(`/users/${idUsuario}/`);
      const lojasExistentes = response.data.lojas || [];
      const lojaAtualizada = lojasExistentes.find(
        (loja) => loja.id === lojaSelecionada.id
      );

      if (!lojaAtualizada) {
        throw new Error("Loja não encontrada");
      }
      const departamentosExistentes = lojaAtualizada.departamentos || [];
      const departamentoAtualizado = departamentosExistentes.find(
        (departamento) => departamento.id === departamentoSelecionado.id
      );
      if (!departamentoAtualizado) {
        throw new Error("Departamento não encontrado");
      }

      const produtosExistentes = departamentoAtualizado.produtos || [];
      const produtoAtualizado = produtosExistentes.find(
        (produto) => produto.id === editandoProdutoId
      );
      if (!produtoAtualizado) {
        throw new Error("Produto não encontrado");
      }
      produtoAtualizado.descricao = descricaoProduto;
      produtoAtualizado.codigo = codigoProduto;
      produtoAtualizado.validade = validadeProduto;
      produtoAtualizado.comTroca = checked.comTroca;
      produtoAtualizado.semTroca = checked.semTroca;

      const produtosAtualizados = produtosExistentes.map((produto) =>
        produto.id === editandoProdutoId ? produtoAtualizado : produto
      );

      const departamentosAtualizados = departamentosExistentes.map(
        (departamento) => {
          if (departamento.id === departamentoSelecionado.id) {
            return { ...departamento, produtos: produtosAtualizados };
          }
          return departamento;
        }
      );

      const lojasAtualizadas = lojasExistentes.map((loja) => {
        if (loja.id === lojaSelecionada.id) {
          return { ...loja, departamentos: departamentosAtualizados };
        }
        return loja;
      });

      const data = { lojas: lojasAtualizadas };
      const patchResponse = await api.patch(`/users/${idUsuario}/`, data);
      if (patchResponse.status >= 200 && patchResponse.status < 300) {
        console.log("Departamento atualizado");
      } else {
        console.error("Erro ao atualizar os dados");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const deletaProduto = async () => {
    try {
      const response = await api.get(`/users/${idUsuario}`);
      const lojasExistentes = response.data.lojas || [];
      const lojaAtualizada = lojasExistentes.find(
        (loja) => loja.id === lojaSelecionada.id
      );
      const departamentos = lojaAtualizada.departamentos || [];
      const departamentoAtualizado = departamentos.find(
        (departamento) => departamento.id === departamentoSelecionado.id
      );

      if (!departamentoAtualizado) {
        throw new Error("Departamento não encontrado");
      }

      const produtos = departamentoAtualizado.produtos || [];
      const produtosAtualizados = produtos.filter(
        (produto) => produto.id !== produtoSelecionado
      );

      if (!produtosAtualizados) {
        throw new Error("Produto não encontrado");
      }

      const departamentosAtualizados = departamentos.map((departamento) => {
        if (departamento.id === departamentoSelecionado.id) {
          return { ...departamento, produtos: produtosAtualizados };
        }
        return departamento;
      });

      const lojasAtualizadas = lojasExistentes.map((loja) => {
        if (loja.id === lojaSelecionada.id) {
          return { ...loja, departamentos: departamentosAtualizados };
        }
        return loja;
      });

      const data = { lojas: lojasAtualizadas };

      const patchResponse = await api.patch(`users/${idUsuario}`, data);

      if (patchResponse.status === 200 || patchResponse.status === 204) {
        console.log("Produto excluido");
        await buscarProduto();
      } else {
        console.error("Erro ao excluir os dados");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name } = event.target;

    setChecked((prevState) => ({
      comTroca: name === "comTroca" ? true : false,
      semTroca: name === "semTroca" ? true : false,
    }));
  };

  const buscarProduto = async () => {
    try {
      const response = await api.get(`/users/${idUsuario}/`);
      const lojasExistentes = response.data.lojas || [];

      const lojaAtualizada = lojasExistentes.find(
        (loja) => loja.id === lojaSelecionada.id
      );

      if (!lojaAtualizada) {
        throw new Error("Loja não encontrada");
      }
      const departamentosExistentes = lojaAtualizada.departamentos || [];
      const departamentoAtualizado = departamentosExistentes.find(
        (departamento) => departamento.id === departamentoSelecionado.id
      );
      if (!departamentoAtualizado) {
        throw new Error("Departamento não encontrado");
      }

      const produtos = departamentoAtualizado.produtos || [];
      // setListaProdutos(produtos);

      const dataAtual = new Date();
      const dataParaRecolher = await dataParaRecolhimento(dataAtual);
      const produtosRecolhimento = produtos.filter((produto) => {
        const validadeProduto = new Date(produto.validade.replace(/-/g, "/"));

        validadeProduto.setHours(0, 0, 0, 0);
        dataParaRecolher.setHours(0, 0, 0, 0);

        return validadeProduto.getTime() === dataParaRecolher.getTime();
      });

      setProdutosParaExibir(produtosRecolhimento);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    buscarProduto();
  }, []);

  return (
    <Container>
      <Link to="/produtos">
        <ArrowBack />
      </Link>
      <LogoContainer variant="primary">
        <ImageContainer
          variant="secondary"
          src="https://cdn-icons-png.flaticon.com/512/5087/5087847.png"
          alt="Logo  do aplicativo Venci Menos"
        />
      </LogoContainer>
      {popUpVisibleTwo && (
        <PopUp text="Item excluído com sucesso!">
          <Button
            title="Ok"
            onClick={() => {
              setPopUpVisibleTwo(false);
            }}
          ></Button>
        </PopUp>
      )}
      {popUpVisibleThree && (
        <PopUp text="Deseja realmente excluir o item?">
          <DivButtonPopUp>
            <Button
              title="Sim"
              onClick={() => {
                if (produtoSelecionado) {
                  deletaProduto(produtoSelecionado);
                  setpopUpVisibleThree(false);
                  setPopUpVisibleTwo(true);
                }
              }}
            ></Button>
            <Button
              variant="tertiary"
              title="Não"
              onClick={() => setpopUpVisibleThree(false)}
            ></Button>
          </DivButtonPopUp>
        </PopUp>
      )}
      {inputVisible ? (
        <ContainerAdicionaProduto>
          <SubTitleProduto>Insira as informações do item</SubTitleProduto>
          <ContainerInput onSubmit={ProdutoAdicionado}>
            <DivInputs>
              <Label htmlFor="descricao" variant="primary">
                Descrição do produto
              </Label>
              <InputInsert
                type="text"
                name="descricao"
                value={descricaoProduto}
                onChange={(e) => setDescricaoProduto(e.target.value)}
                variant="primary"
              />
            </DivInputs>
            <DivInputs>
              <Label htmlFor="codigo" variant="primary">
                Código
              </Label>
              <InputInsert
                type="text"
                name="codigo"
                value={codigoProduto}
                onChange={(e) => setCodigoProduto(e.target.value)}
                variant="primary"
              />
            </DivInputs>
            <DivInputs>
              <Label htmlFor="validade" variant="primary">
                Data de validade
              </Label>
              <InputInsert
                type="date"
                name="validade"
                value={validadeProduto}
                onChange={(e) => setValidadeProduto(e.target.value)}
                variant="primary"
              />
            </DivInputs>
            <DivCheckbox>
              <DivInputs>
                <Label htmlFor="comTroca" variant="secondary">
                  Com troca
                </Label>
                <Checkbox
                  name="comTroca"
                  checked={checked.comTroca}
                  onChange={handleCheckboxChange}
                />
              </DivInputs>
              <DivInputs>
                <Label htmlFor="semTroca" variant="secondary">
                  Sem troca
                </Label>
                <Checkbox
                  name="semTroca"
                  checked={checked.semTroca}
                  onChange={handleCheckboxChange}
                />
              </DivInputs>
            </DivCheckbox>
            <Button type="submit" title="Salvar" variant="primary" />
          </ContainerInput>
        </ContainerAdicionaProduto>
      ) : (
        <>
          <TitleProduto>Itens para recolhimento</TitleProduto>
          <ContainerProdutos>
            <ProdutosLista>
              {produtosParaExibir.map((produto) => (
                <ContainerItem key={produto.id}>
                  <Produto key={produto.id}
                  onClick={() => {
                    setProdutoSelecionado(produto);
                    navigate('/infoproduto');
                  }}>{produto.descricao}</Produto>
                  <Edit
                    onClick={() => {
                      setDescricaoProduto(produto.descricao);
                      setCodigoProduto(produto.codigo);
                      setValidadeProduto(produto.validade);
                      setEditandoProdutoId(produto.id);
                      setInputVisible(true);
                    }}
                  />
                  <TrashButton
                    onClick={() => {
                      setProdutoSelecionado(produto.id);
                      setpopUpVisibleThree(true);
                    }}
                  />
                </ContainerItem>
              ))}
            </ProdutosLista>
          </ContainerProdutos>
        </>
      )}
    </Container>
  );
};

export default Recolhimento;
