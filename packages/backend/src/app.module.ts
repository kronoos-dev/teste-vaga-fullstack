import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CSVModule } from './modules/CSV/csv.module';
import { PrismaService } from './database/prisma.service';
import { ContractModule } from './modules/Contract/contract.module';

@Module({
  imports: [
    CSVModule,
    ContractModule
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
