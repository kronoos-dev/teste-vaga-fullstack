    
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contract } from '../types';

interface ContractsState {
    data: Contract[];
    loading: boolean;
    error: string | null;
}

const initialState: ContractsState = {
    data: [],
    loading: false,
    error: null,
};

const contractsSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {
        fetchContractsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchContractsSuccess(state, action: PayloadAction<Contract[]>) {
            state.loading = false;
            state.data = action.payload; 
            state.error = null;
        },
        fetchContractsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchContractsStart, fetchContractsSuccess, fetchContractsFailure } = contractsSlice.actions;

export default contractsSlice.reducer;
