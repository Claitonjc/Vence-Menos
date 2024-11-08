import {
  Container,
  ContainerLojas,
  TitleLoja,
  LogoContainer,
  ContainerAdicionaLoja,
  SubTitleLoja,
  ContainerInput,
  LojasLista,
  Loja,
  ContainerItem,
  DivButtonPopUp,
} from "./styles";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonPlus } from "../../components/ButtonPlus";
import { ConfigComponent } from "../../components/ConfigComponent";
import { ArrowBack } from "../../components/ArrowBack";
import { ImageContainer } from "../../components/Image";
import { InputInsert } from "../../components/InputInsert";
import { TrashButton } from "../../components/TrashButton";
import { Edit } from "../../components/Edit";
import { PopUp } from "../../components/PopUp";
import { api } from "../../services/api";
import { useLoja } from "../../hooks/LojaContext";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../components/Button";

export const CadastrarLojas = () => {

  const navigate = useNavigate();

  const { idUsuario, setLojaSelecionada, listaLojas, setListaLojas } = useLoja();

  const [plusVisible, setPlusVisible] = useState(true);
  const [inputVisible, setInputVisible] = useState(false);
  const [nomeLoja, setNomeLoja] = useState("");
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [selectedLojaId, setSelectedLojaId] = useState(null);
  const [popUpVisibleTwo, setPopUpVisibleTwo] = useState(false);
  const [editandoLojaId, setEditandoLojaId] = useState(null);

  const adicionaNomeLojas = () => {
    setNomeLoja("");
    setEditandoLojaId(null);
    setPlusVisible(false);
    setInputVisible(true);
  };

  const removeAdicao = () => {
    setNomeLoja("");
    setInputVisible(false);
    setEditandoLojaId(null);
    setPlusVisible(true);
  };

  const deletaLoja = async (idLoja) => {
    try {
      const lojasExistentes = listaLojas;
      const lojasAtualizadas = lojasExistentes.filter(
        (loja) => loja.id !== idLoja
      );

      const data = { lojas: lojasAtualizadas };

      const patchResponse = await api.patch(`users/${idUsuario}`, data);

      if (patchResponse.status === 200 || patchResponse.status === 204) {
        console.log("Loja excluida");
        await buscarLoja();
        setPlusVisible(true);
      } else {
        console.error("Erro ao excluir os dados");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const adicionaLoja = async () => {
    try {
      const lojasExistentes = listaLojas;
      const novaLoja = { id: uuidv4(), nome: nomeLoja };
      const lojasAtualizadas = [...lojasExistentes, novaLoja];

      const data = { lojas: lojasAtualizadas };

      const patchResponse = await api.patch(`/users/${idUsuario}/`, data);

      if (patchResponse.status === 200) {
        console.log("Loja adicionada");
      } else {
        console.error("Erro ao salvar os dados");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleClick = (event) => {
    if (event.key === "Enter") {
      lojaAdicionada();
    }
  };

  const lojaAdicionada = async () => {
    setInputVisible(false);
    setPlusVisible(false);
    if (editandoLojaId) {
      await atualizarNomeLoja(editandoLojaId);
    } else {
      await adicionaLoja();
    }
    await buscarLoja();
    setNomeLoja("");
    setEditandoLojaId(null);
  };

const atualizarNomeLoja = async () => {
    try {
      const lojasExistentes = listaLojas;
      const lojasAtualizas = lojasExistentes.map((loja) =>
        loja.id === editandoLojaId ? { ...loja, nome: nomeLoja } : loja
      );

      const data = { lojas: lojasAtualizas };
      const patchResponse = await api.patch(`/users/${idUsuario}/`, data);
      if (patchResponse.status === 200) {
        console.log("Loja atualizada");
      } else {
        console.error("Erro ao atualizar os dados");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  
  const buscarLoja = async () => {
    try {
      const response = await api.get(`/users/${idUsuario}/`);
      const lojas = response.data.lojas || [];
      setListaLojas(lojas);
    } catch (error) {
      console.error("Erro ao buscar lojas:", error);
    }
  };

  useEffect(() => {
    buscarLoja();
  }, []);

  return (
    <Container>
      <Link to="/">
        <ArrowBack />
      </Link>

      {popUpVisible && (
        <PopUp variant="primary" text="Deseja realmente excluir a loja?">
          <DivButtonPopUp>
            <Button
              title="Sim"
              onClick={() => {
                if (selectedLojaId) {
                  deletaLoja(selectedLojaId);
                  setPopUpVisible(false);
                  setPopUpVisibleTwo(true);
                }
              }}
            ></Button>
            <Button
              variant="tertiary"
              title="Não"
              onClick={() => setPopUpVisible(false)}
            ></Button>
          </DivButtonPopUp>
        </PopUp>
      )}

      {popUpVisibleTwo && (
        <PopUp variant="primary" text="Loja excluída com sucesso!">
          <Button
            title="Ok"
            onClick={() => {
              setPopUpVisibleTwo(false);
            }}
          ></Button>
        </PopUp>
      )}
      
      <LogoContainer variant="secondary">
        <ImageContainer
          variant="secondary"
          src="https://cdn-icons-png.flaticon.com/512/5087/5087847.png"
          alt="Logo  do aplicativo Venci Menos"
        />
      </LogoContainer>

      {listaLojas.length === 0 ? (
        <>
          {plusVisible && (
            <ContainerLojas>
              <ButtonPlus
                variant="primary"
                type="button"
                onClick={adicionaNomeLojas}
              />
              <TitleLoja variant="primary">Adicione uma loja</TitleLoja>
            </ContainerLojas>
          )}

          {inputVisible && (
            <ContainerAdicionaLoja>
              <SubTitleLoja>Insira o nome da loja</SubTitleLoja>
              <ContainerInput>
                <InputInsert
                  type="text"
                  value={nomeLoja}
                  onKeyDown={handleClick}
                  onChange={(e) => setNomeLoja(e.target.value)}
                  variant="primary"
                />
                <TrashButton onClick={removeAdicao} />
              </ContainerInput>
            </ContainerAdicionaLoja>
          )}
        </>
      ) : inputVisible ? (
        <ContainerAdicionaLoja>
          <SubTitleLoja>Insira o nome da loja</SubTitleLoja>
          <ContainerInput>
            <InputInsert
              type="text"
              value={nomeLoja}
              onKeyDown={handleClick}
              onChange={(e) => setNomeLoja(e.target.value)}
              variant="primary"
            />
            <TrashButton onClick={removeAdicao} />
          </ContainerInput>
        </ContainerAdicionaLoja>
      ) : (
        <ContainerLojas>
          <TitleLoja variant="secondary">Lojas</TitleLoja>

          <LojasLista>
            {listaLojas.map((loja) => (
              <ContainerItem key={loja.id}>
                <Loja
                  key={loja.id}
                  onClick={() => {
                    setLojaSelecionada(loja);
                    navigate("/departamentos");
                  }}
                >
                  {loja.nome}
                </Loja>
                <Edit
                  onClick={() => {
                    setNomeLoja(loja.nome);
                    setEditandoLojaId(loja.id);
                    setInputVisible(true);
                    setPlusVisible(false);
                  }}
                />
                <TrashButton
                  onClick={() => {
                    setSelectedLojaId(loja.id);
                    setPopUpVisible(true);
                  }}
                />
              </ContainerItem>
            ))}
          </LojasLista>

          <ButtonPlus
            variant="secondary"
            type="button"
            onClick={adicionaNomeLojas}
          />
        </ContainerLojas>
      )}

      <ConfigComponent onClick={() => navigate("/configuracoes")} />
    </Container>
  );
};

export default CadastrarLojas;
