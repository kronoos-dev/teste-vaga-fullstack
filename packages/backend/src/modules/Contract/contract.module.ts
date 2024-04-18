import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';

@Module({
    imports: [],
    controllers: [ContractController],
    providers: [
        PrismaService,
        ContractService
    ],
})
export class ContractModule { }
