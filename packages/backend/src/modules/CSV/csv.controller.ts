import { Controller, Get, Post } from '@nestjs/common';
import { CSVService } from './CSV.service';
import { PrismaService } from 'src/database/prisma.service';

@Controller('file')
export class CSVController {
    constructor(
        private readonly csvService: CSVService,
        private readonly prisma: PrismaService
    ) { }

    @Get('listfile')
    async listCsv() {
        const filePath = 'data.csv';
        const values = await this.csvService.parseCsvToJson(filePath);
        return values
    }

    @Post('csv')
    async parseCsv() {
        const filePath = 'data.csv';

        const values = await this.csvService.parseCsvToJson(filePath);

        const createdContracts = await this.prisma.contract.createMany({
            data: values,
        })

        return { createdContracts }
    }
}