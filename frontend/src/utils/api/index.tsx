import { AppDispatch } from '@/store';
import  { fetchContractsStart, fetchContractsSuccess, fetchContractsFailure }  from '../../store/contractsSlice';
import { Contract } from '../../types';

const fetchData = async (dispatch: AppDispatch, currentPage: number, pageSize: number, setAllContracts: React.Dispatch<React.SetStateAction<Contract[]>>) => {
    dispatch(fetchContractsStart());
    dispatch(fetchContractsStart());
    try {
        const response = await fetch(`http://localhost:3000?page=${currentPage}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error('Erro ao obter os contratos');
        }
        const data = await response.json();
        setAllContracts(data);
        dispatch(fetchContractsSuccess(data));
    } catch (error) {
        dispatch(fetchContractsFailure((error as Error).message));
    }
};

export { fetchData };
