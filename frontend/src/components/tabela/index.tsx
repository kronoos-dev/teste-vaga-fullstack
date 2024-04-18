import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/index';
import { Contract } from '../../types';
import { formatCurrency } from '../../utils/moeda/index';
import { validateCpfCnpj } from '../../utils/cpfCnpj/index';
import { checkConsistency } from '../../utils/calculo/index';
import { fetchData } from '../../utils/api';
import { 
    goToPreviousPage, 
    goToNextPage, 
    handleSearch, 
    filterContracts, 
    toggleSortOrder 
} from '../../utils/filtroE/index';
import { Button, ButtonDiv, Content, Input, StyledTable, TableWrapper, Td, Th, Tr } from './styles';

const Table = () => {
    const dispatch: AppDispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [allContracts, setAllContracts] = useState<Contract[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    
    const loading = useSelector((state: RootState) => state.contracts.loading);
    const error = useSelector((state: RootState) => state.contracts.error);

    useEffect(() => {
        fetchData(dispatch, currentPage, pageSize, setAllContracts); 
    }, [currentPage, pageSize]);


    const filteredContracts = filterContracts(allContracts, searchTerm);

    return (
        <>
        <Content>
            <h2>Pesquisar por página</h2>
            <Input type="text" value={searchTerm} onChange={(event) => handleSearch(event, setSearchTerm)} />
        </Content>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StyledTable>
            {loading && <div>Carregando...</div>}
            {error && <div>Ocorreu um erro: {error}</div>}
            {filteredContracts.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '20px', color: 'white'}}>
                    <p>Nenhum resultado encontrado. Lembre-se de olhar nas próximas páginas!</p>
                </div>
            ) : (
                <TableWrapper>
                    <thead>
                        <tr>
                            <Th>ID <Button onClick={() => toggleSortOrder(sortOrder, setSortOrder, allContracts, setAllContracts)}>
                                {sortOrder === 'asc' ? '▼' : '▲'}
                            </Button></Th>
                            <Th>Número da Instituição</Th>
                            <Th>Número da Agência</Th>
                            <Th>Código do Cliente</Th>
                            <Th>Nome do Cliente</Th>
                            <Th>CPF/CNPJ</Th>
                            <Th>Número do Contrato</Th>
                            <Th>Data do Contrato</Th>
                            <Th>Quantidade de Prestações</Th>
                            <Th>Valor Total</Th>
                            <Th>Código do Produto</Th>
                            <Th>Descrição do Produto</Th>
                            <Th>Código da Carteira</Th>
                            <Th>Descrição da Carteira</Th>
                            <Th>Número da Proposta</Th>
                            <Th>Número da Prestação</Th>
                            <Th>Tipo de Prestação</Th>
                            <Th>Número da Sequência da Prestação</Th>
                            <Th>Data de Vencimento da Prestação</Th>
                            <Th>Valor da Prestação</Th>
                            <Th>Valor de Mora</Th>
                            <Th>Valor de Multa</Th>
                            <Th>Valor de Outros Acréscimos</Th>
                            <Th>Valor do IOF</Th>
                            <Th>Valor de Desconto</Th>
                            <Th>Valor Atual</Th>
                            <Th>ID Situação</Th>
                            <Th>ID Situação Venda</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContracts.map(contract => {
                            checkConsistency(contract); 
                            return (
                                <Tr key={contract.id}>
                                <Td>{contract.id}</Td>
                                <Td>{contract.nrInst}</Td>
                                <Td>{contract.nrAgencia}</Td>
                                <Td>{contract.cdClient}</Td>  
                                <Td>{contract.nmClient}</Td>
                                <Td>{validateCpfCnpj(contract.nrCpfCnpj)}</Td>
                                <Td>{contract.nrContrat}</Td>
                                <Td>{contract.dtContrato && contract.dtContrato.slice(0, 10)}</Td>
                                <Td>{contract.qtPrestacoes}</Td> 
                                <Td>{formatCurrency(contract.vlTotal)}</Td>
                                <Td>{contract.cdProduto}</Td> 
                                <Td>{contract.dsProduto}</Td>
                                <Td>{contract.cdCarteira}</Td>
                                <Td>{contract.dsCarteira}</Td>
                                <Td>{contract.nrProposta}</Td>
                                <Td>{contract.nrPresta}</Td>
                                <Td>{contract.tpPresta}</Td>
                                <Td>{contract.nrSeqPre}</Td>
                                <Td>{contract.dtVctPre && contract.dtVctPre.slice(0, 10)}</Td>
                                <Td>{formatCurrency(contract.vlPresta)}</Td>
                                <Td>{formatCurrency(contract.vlMora)}</Td>
                                <Td>{formatCurrency(contract.vlMulta)}</Td>
                                <Td>{formatCurrency(contract.vlOutAcr)}</Td>
                                <Td>{formatCurrency(contract.vlIof)}</Td>
                                <Td>{formatCurrency(contract.vlDescon)}</Td>
                                <Td>{formatCurrency(contract.vlAtual)}</Td>
                                <Td>{contract.idSituac}</Td>
                                <Td>{contract.idSitVen}</Td> 
                            </Tr>
                            );
                        })}
                    </tbody>
                </TableWrapper>
            )}
            <ButtonDiv>
                <Button onClick={() => goToPreviousPage(currentPage, setCurrentPage)} disabled={currentPage === 1}>Anterior</Button>
                <Button onClick={() => goToNextPage(currentPage, setCurrentPage)}>Próxima</Button>
            </ButtonDiv>
        </StyledTable>
        </div>
        </>
    );
};

export default Table;
