import {
  Container,
  Calendar,
  ContainerProdutos,
  TitleProduto,
  ContainerAdicionaProduto,
  ContainerInput,
  ContainerItem,
  ProdutosLista,
  DivButtonPopUp,
  LogoContainer,
  Produto,
  SubTitleProduto,
  Label,
  DivInputs,
  DivCheckbox,
  LupaIcon,
} from "./styles";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack } from "../../components/ArrowBack";
import { ImageContainer } from "../../components/Image";
import { ButtonPlus } from "../../components/ButtonPlus";
import { api } from "../../services/api";
import { useLoja } from "../../hooks/LojaContext";
import { v4 as uuidv4 } from "uuid";
import { PopUp } from "../../components/PopUp";
import { Button } from "../../components/Button";
import { InputInsert } from "../../components/InputInsert";
import { TrashButton } from "../../components/TrashButton";
import { Edit } from "../../components/Edit";
import { Checkbox } from "../../components/Checkbox";

export const Produtos = () => {
  const navigate = useNavigate();

  const {
    idUsuario,
    lojaSelecionada,
    departamentoSelecionado,
    produtoSelecionado,
    setProdutoSelecionado,
    checked,
    setChecked,
    descricaoProduto,
    setDescricaoProduto,
    codigoProduto,
    setCodigoProduto,
    listaProdutos,
    setListaProdutos,
    searchTermDescription,
    setSearchTermDescription,
    searchTermCode,
    setSearchTermCode
  } = useLoja();

  const [plusVisible, setPlusVisible] = useState(true);
  const [inputVisible, setInputVisible] = useState(false);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [popUpVisibleTwo, setPopUpVisibleTwo] = useState(false);
  const [popUpVisibleThree, setpopUpVisibleThree] = useState(false);
  const [editandoProdutoId, setEditandoProdutoId] = useState(null);
  const [validadeProduto, setValidadeProduto] = useState("");
  const [popUpPesquisa, setPopUpPesquisa] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name } = event.target;

    setChecked((prevState) => ({
      comTroca: name === "comTroca" ? true : false,
      semTroca: name === "semTroca" ? true : false,
    }));
  };

  const adicionaNomeProdutos = () => {
    setEditandoProdutoId(null);
    setPlusVisible(false);
    setInputVisible(true);
    setChecked(false);
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
        setPlusVisible(true);
      } else {
        console.error("Erro ao excluir os dados");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const adicionaProduto = async (lojas) => {
    try {
      const response = await api.get(`/users/${idUsuario}`);
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

      const novoProduto = {
        id: uuidv4(),
        descricao: descricaoProduto,
        codigo: codigoProduto,
        validade: validadeProduto,
        comTroca: checked.comTroca,
        semTroca: checked.semTroca,
      };

      const produtosAtualizados = [...produtosExistentes, novoProduto];

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

      if (patchResponse.status === 200) {
        console.log("Produto adicionado");
      } else {
        console.error("Erro ao salvar os dados");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const ProdutoAdicionado = async () => {
    setInputVisible(false);
    setPlusVisible(false);
    if (editandoProdutoId) {
      await atualizarNomeProduto(editandoProdutoId);
    } else {
      await adicionaProduto();
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
        console.log("Produto atualizado");
      } else {
        console.error("Erro ao atualizar os dados");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
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
      setListaProdutos(produtos);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    buscarProduto(); // Busca as lojas quando o componente monta
  }, [idUsuario, lojaSelecionada, departamentoSelecionado]);

  const handleSubmit = (event) => {
    event.preventDefault();
    ProdutoAdicionado();
  };

  return (
    <Container>
      <Link to="/departamentos">
        <ArrowBack />
      </Link>
      {popUpVisible && (
        <PopUp text="Item salvo  com sucesso!" variant="primary">
          <Button
            variant="secondary"
            type="button"
            title="Ok"
            onClick={() => {
              setPopUpVisible(false);
            }}
          ></Button>
        </PopUp>
      )}
      {popUpVisibleTwo && (
        <PopUp text="Item excluído com sucesso!" variant="primary">
          <Button
            title="Ok"
            onClick={() => {
              setPopUpVisibleTwo(false);
            }}
          ></Button>
        </PopUp>
      )}
      {popUpVisibleThree && (
        <PopUp text="Deseja realmente excluir o item?" variant="primary">
          <DivButtonPopUp variant="primary">
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

      {popUpPesquisa && (
        <PopUp text="Consulta" variant="secondary">
          <DivButtonPopUp variant="secondary">
            <Label htmlFor="produto" variant="primary">
              Produto:
            </Label>
            <InputInsert
              variant="primary"
              value={searchTermDescription}
              onChange={(e) => setSearchTermDescription(e.target.value)}
            />
          </DivButtonPopUp>
          <DivButtonPopUp variant="secondary">
            <Label htmlFor="codigo" variant="primary">
              Código:
            </Label>
            <InputInsert
              variant="primary"
              value={searchTermCode}
              onChange={(e) => setSearchTermCode(e.target.value)}
            />
            <Button title="Pesquisar" variant="fourth" onClick={() => navigate('/pesquisa')}></Button>
          </DivButtonPopUp>
        </PopUp>
      )}
      <LogoContainer variant="primary">
        <ImageContainer
          variant="secondary"
          src="https://cdn-icons-png.flaticon.com/512/5087/5087847.png"
          alt="Logo  do aplicativo Venci Menos"
        />
      </LogoContainer>
      <LupaIcon onClick={() => setPopUpPesquisa(true)} />
      <Calendar onClick={() => navigate("/recolhimento")} />

      {listaProdutos.length === 0 ? (
        <>
          {plusVisible && (
            <ContainerProdutos>
              <ButtonPlus
                variant="primary"
                type="button"
                onClick={adicionaNomeProdutos}
              />
              <TitleProduto variant="primary">Adicione um item</TitleProduto>
            </ContainerProdutos>
          )}

          {inputVisible && (
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
          )}
        </>
      ) : inputVisible ? (
        <ContainerAdicionaProduto>
          <SubTitleProduto>Insira as informações do item</SubTitleProduto>
          <ContainerInput onSubmit={handleSubmit}>
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
            <Button
              type="submit"
              title="Salvar"
              variant="primary"
              onClick={() => setPopUpVisible(true)}
            />
          </ContainerInput>
        </ContainerAdicionaProduto>
      ) : (
        <ContainerProdutos>
          <TitleProduto variant="secondary">
            {departamentoSelecionado.nome}
          </TitleProduto>
          <ProdutosLista>
            {listaProdutos.map((produto) => (
              <ContainerItem key={produto.id}>
                <Produto
                  key={produto.id}
                  onClick={() => {
                    setProdutoSelecionado(produto);
                    navigate("/infoproduto");
                  }}
                >
                  {produto.descricao}
                </Produto>
                <Edit
                  onClick={() => {
                    setDescricaoProduto(produto.descricao);
                    setCodigoProduto(produto.codigo);
                    setValidadeProduto(produto.validade);
                    setEditandoProdutoId(produto.id);
                    setInputVisible(true);
                    setPlusVisible(false);
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
          <ButtonPlus
            variant="secondary"
            type="button"
            onClick={adicionaNomeProdutos}
          />
        </ContainerProdutos>
      )}
    </Container>
  );
};

export default Produtos;
