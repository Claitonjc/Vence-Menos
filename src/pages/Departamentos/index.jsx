import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonPlus } from "../../components/ButtonPlus";
import { ArrowBack } from "../../components/ArrowBack";
import { ImageContainer } from "../../components/Image"
import { InputInsert } from "../../components/InputInsert"
import { TrashButton } from "../../components/TrashButton";
import { Edit } from "../../components/Edit";
import { PopUp } from '../../components/PopUp'
import { api } from "../../services/api";
import { useLoja } from "../../hooks/LojaContext";
import { v4 as uuidv4 } from 'uuid';
import { Container,
        BellNotification, 
        ContainerDepartamentos,
        TitleDepartamento,
        LogoContainer,
        ContainerAdicionaDepartamento,
        SubTitleDepartamento,
        ContainerInput,
        DepartamentosLista,
        Departamento,
        ContainerItem,
        DivButtonPopUp,
        /*BellNotificationplus*/} from "./styles";
import { Button } from "../../components/Button";


export const Departamentos = () => {



    const navigate = useNavigate();

    const { idUsuario,
            listaDepartamentos,
            setListaDepartamentos,
            lojaSelecionada,
            departamentoSelecionado,
            setDepartamentoSelecionado} = useLoja();

    const [plusVisible, setPlusVisible] = useState(true);
    const [inputVisible, setInputVisible] = useState(false);
    const [nomeDepartamento, setNomeDepartamento] = useState('');
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [popUpVisibleTwo, setPopUpVisibleTwo] = useState(false);
    const [editandoDepartamentoId, setEditandoDepartamentoId] = useState(null);

    
    const adicionaNomeDepartamentos = () => {
        setNomeDepartamento('');
        setEditandoDepartamentoId(null)
        setPlusVisible(false);
        setInputVisible(true);
    }

    const removeAdicao = () => {
        setNomeDepartamento('');
        setInputVisible(false);
        setEditandoDepartamentoId(null);
        setPlusVisible(true);
    }

    const deletaDepartamento = async () => {
        try {
            const response = await api.get(`/users/${idUsuario}`);
            const lojasExistentes = response.data.lojas || [];
            const lojasAtualizadas = lojasExistentes.map((loja) => {
                if(loja.id === lojaSelecionada.id) {
                    const departamentos = loja.departamentos || [];
                    const departamentoAtualizado = departamentos.filter((departamento) => departamento.id !== departamentoSelecionado);
            
                    if(!departamentoAtualizado) {
                        throw new Error('Departamento não encontrado');
                    }
                    return { ...loja, departamentos: departamentoAtualizado };
                }
                return loja;
            })

            const data = { lojas: lojasAtualizadas };
            
            const patchResponse = await api.patch(`users/${idUsuario}`, data);

            if (patchResponse.status === 200 || patchResponse.status === 204) {
                  console.log('Departamento excluido')
                    await buscarDepartamento();
                    setPlusVisible(true);      
            } else {
              console.error('Erro ao excluir os dados');
            }
          } catch (error) {
            console.error('Erro na requisição:', error);
          }
    }

    const adicionaDepartamento = async (lojas) => {
        
        try {
            const response = await api.get(`/users/${idUsuario}`);
            const lojasExistentes = response.data.lojas || [];

            const lojaAtualizada = lojasExistentes.find((loja) => loja.id ===lojaSelecionada.id);

            if(!lojaAtualizada) {
                throw new Error('Loja não encontrada');
            }

            
            const departamentosExistentes = lojaAtualizada.departamentos || [];
            
            const novoDepartamento = { id: uuidv4(), nome: nomeDepartamento};
            
            const departamentosAtualizados = [...departamentosExistentes, novoDepartamento];
            
            const lojasAtualizadas = lojasExistentes.map((loja) => {
                if(loja.id === lojaSelecionada.id) {
                    return { ...loja, departamentos: departamentosAtualizados };
                }
                return loja;
            })

            const data = { lojas: lojasAtualizadas};
            
            const patchResponse = await api.patch(`/users/${idUsuario}/`, data);

            if(patchResponse.status === 200) {
                console.log('Departamento adicionado');
            } else {
                console.error('Erro ao salvar os dados');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    const handleClick = (event) => {
        if(event.key === 'Enter') {
            DepartamentoAdicionado();
        }
    }

    const DepartamentoAdicionado =  async () => {
                setInputVisible(false);
                setPlusVisible(false);
                if(editandoDepartamentoId) {
                    await atualizarNomeDepartamento(editandoDepartamentoId);
                } else {
                    await adicionaDepartamento();
                }
                await buscarDepartamento();
                setNomeDepartamento('');
                setEditandoDepartamentoId(null); 
    }

    const handleChange = (e) => {
        setNomeDepartamento(e.target.value);
    }

      const atualizarNomeDepartamento = async () => { 
          try {
            const response = await api.get(`/users/${idUsuario}/`);
                const lojasExistentes = response.data.lojas || [];
                const lojaAtualizada = lojasExistentes.map((loja) => {
                    if(loja.id === lojaSelecionada.id) {
                        const departamentos = loja.departamentos || [];
                        const departamentoAtualizado = departamentos.find((departamento) => departamento.id === editandoDepartamentoId);
                        if(!departamentoAtualizado) {
                            throw new Error('Departamento não encontrado');
                        }
                        departamentoAtualizado.nome = nomeDepartamento;
                        
                        return { ...loja, departamentos };
                    }
                    return loja;
                })
                
                
          
                
                const data = { lojas: lojaAtualizada };
                const patchResponse = await api.patch(`/users/${idUsuario}/`, data);
                if(patchResponse.status === 200) {
                    console.log('Departamento atualizado');
                } else {
                    console.error('Erro ao atualizar os dados');
                }

        } catch (error) {
            console.error('Erro na requisição:', error);
        }
      };

      const buscarDepartamento = async () => {
        try {
            const response = await api.get(`/users/${idUsuario}/`);
            const lojasExistentes = response.data.lojas || [];
            const lojaAtualizada = lojasExistentes.find((loja) => loja.id === lojaSelecionada.id);

            if(!lojaAtualizada) {
                throw new Error('Loja não encontrada');
            }
            const departamentos = lojaAtualizada.departamentos || [];
            setListaDepartamentos(departamentos);
        } catch (error) {
            console.error('Erro ao buscar departamentos:', error);
        }
      }
      
      useEffect(() => {
        buscarDepartamento(); // Busca as lojas quando o componente monta
    });

    return (
        <Container>
            <Link to="/cadastrarlojas">
            <ArrowBack />
            </Link>
            {popUpVisible && (
                <PopUp text='Deseja realmente excluir o departamento?'>
                    <DivButtonPopUp>
                        <Button title='Sim' onClick={() => {
                            if(departamentoSelecionado) {
                                deletaDepartamento(departamentoSelecionado); 
                                setPopUpVisible(false);
                                setPopUpVisibleTwo(true);
                            }
                        }}></Button>
                        <Button variant='tertiary' title='Não' onClick={() => setPopUpVisible(false)}></Button>
                    </DivButtonPopUp>
                    
                </PopUp>
            )}
            {popUpVisibleTwo && (
                <PopUp text='Departamento excluído com sucesso!'>
                    <Button title='Ok' onClick={() => {
                        setPopUpVisibleTwo(false);
                    }}></Button>
                </PopUp>
            )}
            <LogoContainer variant='primary'>
                <ImageContainer variant="secondary" src="https://cdn-icons-png.flaticon.com/512/5087/5087847.png" alt="Logo  do aplicativo Venci Menos"/>
            </LogoContainer>

            
                <BellNotification onClick={() => navigate('/produtossemtroca')} />
            
                {/* <BellNotificationplus onClick={() => navigate('/produtossemtroca')}/> */}
            

            {listaDepartamentos.length === 0 ? (
                <>
                {plusVisible && (
                    <ContainerDepartamentos>
                        <ButtonPlus variant='primary' type='button' onClick={adicionaNomeDepartamentos}/>
                        <TitleDepartamento variant='primary'>Adicione um Departamento</TitleDepartamento>
                    </ContainerDepartamentos>
                )}

                {inputVisible && (
                    <ContainerAdicionaDepartamento>
                        <SubTitleDepartamento>Insira o nome do Departamento</SubTitleDepartamento>
                        <ContainerInput>
                            <InputInsert type='text' value={nomeDepartamento} onKeyDown={handleClick} onChange={handleChange}  variant='primary'/>
                            <TrashButton onClick={removeAdicao}/>
                        </ContainerInput>
                    </ContainerAdicionaDepartamento>
                )}
                </>
            ) : (
                inputVisible ? (
                    <ContainerAdicionaDepartamento>
                        <SubTitleDepartamento>Insira o nome do Departamento</SubTitleDepartamento>
                        <ContainerInput>
                            <InputInsert type='text' value={nomeDepartamento} onKeyDown={handleClick} onChange={handleChange} variant='primary'/>
                            <TrashButton onClick={removeAdicao}/>
                        </ContainerInput>
                    </ContainerAdicionaDepartamento>
                ) : (
                <ContainerDepartamentos>
                    <TitleDepartamento variant='secondary'>Departamentos</TitleDepartamento>
                    <DepartamentosLista>   
                        {listaDepartamentos.map((departamento) => (
                            <ContainerItem key={departamento.id}>
                            <Departamento key={departamento.id} onClick={() => {
                                setDepartamentoSelecionado(departamento);
                                navigate('/produtos');
                            }}>{departamento.nome}</Departamento>
                            <Edit  onClick={() => {
                                setNomeDepartamento(departamento.nome);
                                setEditandoDepartamentoId(departamento.id);
                                setInputVisible(true);
                                setPlusVisible(false);
                            }}/>
                            <TrashButton onClick={() => {
                                setDepartamentoSelecionado(departamento.id);
                                setPopUpVisible(true);
                            }}/>
                            </ContainerItem>
                        ))}
                    </DepartamentosLista>
                     <ButtonPlus variant='secondary' type='button' onClick={adicionaNomeDepartamentos}/>
                </ContainerDepartamentos>
                )
            )}

            
        </Container>
    )
}

export default Departamentos;