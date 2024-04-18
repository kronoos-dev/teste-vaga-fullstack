import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getContractsData(startIndex: number, endIndex: number) {
    try {
        const contracts = await prisma.contrato.findMany({
            skip: startIndex,
            take: endIndex - startIndex
        });
        return contracts.map(contract => ({ ...contract }));
    } catch (error) {
        console.error('Erro ao recuperar dados:', error);
    }
}
