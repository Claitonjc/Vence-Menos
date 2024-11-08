import { createContext, useContext, useState } from "react";

const LojaContext = createContext();

export const useLoja = () => useContext(LojaContext);

export const LojaProvider = ({ children }) => {
  const [listaLojas, setListaLojas] = useState([]);
  const [lojaSelecionada, setLojaSelecionada] = useState(null);
  const [idUsuario, setIdUsuario] = useState("");
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [produtoSemTroca, setProdutoSemTroca] = useState("");
  const [periodoDeRecolhimento, setPeriodoDeRecolhimento] = useState("");
  const [listaProdutosSemTroca, setListaProdutosSemTroca] = useState([]);
  const [listaDepartamentos, setListaDepartamentos] = useState([]);
  const [descricaoProduto, setDescricaoProduto] = useState("");
  const [codigoProduto, setCodigoProduto] = useState("");
  const [listaProdutos, setListaProdutos] = useState([]);
  const [searchTermDescription, setSearchTermDescription] = useState('');
  const [searchTermCode, setSearchTermCode] = useState('');
  const [checked, setChecked] = useState({
    comTroca: false,
    semTroca: false,
  });


  return (
    <LojaContext.Provider
      value={{
        listaLojas,
        setListaLojas,
        listaDepartamentos,
        setListaDepartamentos,
        departamentoSelecionado,
        setDepartamentoSelecionado,
        lojaSelecionada,
        setLojaSelecionada,
        idUsuario,
        setIdUsuario,
        produtoSelecionado,
        setProdutoSelecionado,
        produtoSemTroca,
        setProdutoSemTroca,
        periodoDeRecolhimento,
        setPeriodoDeRecolhimento,
        checked,
        setChecked,
        listaProdutosSemTroca,
        setListaProdutosSemTroca,
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
      }}
    >
      {children}
    </LojaContext.Provider>
  );
};
