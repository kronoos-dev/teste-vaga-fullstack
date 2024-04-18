import { Controller, Get, Query } from '@nestjs/common';
import { ContractService } from './contract.service';

@Controller('contract')
export class ContractController {
    constructor(
        private readonly contractService: ContractService,
    ) {}

    @Get('')
    async list(@Query("page") page: string) {
        return await this.contractService.list(page)
    }
}