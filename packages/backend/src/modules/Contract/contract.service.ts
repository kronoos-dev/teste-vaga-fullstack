import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IContract } from 'src/dtos/contract.dto';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';


@Injectable()
export class ContractService {
  constructor(private prisma: PrismaService) {}

  async list(pageSelect: string): Promise<PaginatorTypes.PaginatedResult<IContract>> {

    const paginate: PaginatorTypes.PaginateFunction = paginator({
      page: pageSelect || 1,
      perPage: 10,
    });
    
    return paginate(this.prisma.contract)
  }
}