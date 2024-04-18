import { CSVController } from './CSV.controller';
import { Module } from '@nestjs/common';
import { CSVService } from './CSV.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
    imports: [],
    controllers: [CSVController],
    providers: [
        CSVService,
        PrismaService
    ],
})
export class CSVModule { }
