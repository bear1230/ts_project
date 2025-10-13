import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Transaction, TransactionStatus } from './entities/transaction.entity';
import { TransactionItem } from './entities/transaction-item.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';



@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
        @InjectRepository(TransactionItem)
        private transactionItemsRepository: Repository<TransactionItem>,
        private dataSource: DataSource,
    ) {}

    async findAll(): Promise<Transaction[]> {
        return await this.transactionsRepository.find({
            relations: ['client', 'items', 'items.product'],
            order: { transactionDate: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Transaction> {
        const transaction = await this.transactionsRepository.findOne({
            where: { id },
            relations: ['client', 'items', 'items.product'],
        });

        if (!transaction) {
            throw new NotFoundException(`거래 전표 ID ${id}를 찾을 수 없습니다.`);
        }

        return transaction;
    }
}
