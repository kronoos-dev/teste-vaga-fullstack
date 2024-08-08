import { Request, Response } from 'express';
import { getContractsData } from '../services/contractsService';

export async function getContracts(req: Request, res: Response) {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const currentPage = parseInt(page.toString(), 10);
        const size = parseInt(pageSize.toString(), 10);

        const startIndex = (currentPage - 1) * size;
        const endIndex = currentPage * size;

        const contracts = await getContractsData(startIndex, endIndex);
        res.json(contracts);
    } catch (error) {
        console.error('Erro ao recuperar dados:', error)
        res.status(500).json({ error: 'Erro ao recuperar dados' });
    }
}
