import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from '../pages/login';
import { Cadastro } from '../pages/Cadastro'
import { CadastrarLojas } from "../pages/CadastrarLojas";
import { Configuracoes } from "../pages/Configuracoes";
import { Departamentos } from "../pages/Departamentos";
import { LojaProvider } from "../hooks/LojaContext";
import { Produtos } from "../pages/Produtos";
import { InfoProduto } from "../pages/InfoProduto";
import { Recolhimento } from "../pages/Recolhimento";
import { ProdutosSemTroca } from "../pages/ProdutosSemTroca"
import { Pesquisa } from "../pages/Pesquisa"

export const AppRoutes = () => {
    return (
        <LojaProvider>
            <Router>
                    <Routes>
                        <Route path="/" element={<Login />}/>
                        <Route path="/cadastro" element={<Cadastro />}/>
                        <Route path="/cadastrarlojas" element={<CadastrarLojas />}/>
                        <Route path="/configuracoes" element={<Configuracoes />}/>
                        <Route path="/departamentos" element={<Departamentos />}/>
                        <Route path="/produtos" element={<Produtos />}/>
                        <Route path="/infoproduto" element={<InfoProduto />}/>
                        <Route path="/recolhimento" element={<Recolhimento />}/>
                        <Route path="/produtossemtroca" element={<ProdutosSemTroca />}/>
                        <Route path="/pesquisa" element={<Pesquisa />}/>
                    </Routes>
            </Router>
        </LojaProvider>
    )
}