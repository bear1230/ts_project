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

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const transactionNumber = await this.generateTransactionNumber();

            let totalAmount = 0;
            const items = createTransactionDto.items.map((item) => {
                const amount = item.quantity * item.unitPrice;
                totalAmount += amount;
                return {
                    ...item,
                    amount,
                };
            });

            const taxAmount = totalAmount * 0.1; // 부가세 10%
            const finalAmount = totalAmount + taxAmount;

            const transaction = queryRunner.manager.create(Transaction, {
                ...createTransactionDto,
                transactionNumber,
                totalAmount,
                taxAmount,
                finalAmount,
            });

            const savedTransaction = await queryRunner.manager.save(transaction);

            const transactionItems = items.map((item) =>
                queryRunner.manager.create(TransactionItem, {
                    ...item,
                    transactionId: savedTransaction.id,
                }),
            );

            await queryRunner.manager.save(transactionItems);
            await queryRunner.commitTransaction();

            return await this.findOne(savedTransaction.id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new BadRequestException('거래 전표 생성 실패: ' + error.message);
        } finally {
            await queryRunner.release();
        }
    }

    private async generateTransactionNumber(): Promise<string> {
        const today = new Date();
        const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');

        const lastTransaction = await this.transactionsRepository
            .createQueryBuilder('transaction')
            .where('transaction.transaction_number LIKE :pattern', {
                pattern: `TRX-${dateStr}-%`,
            })
            .orderBy('transaction.transaction_number', 'DESC')
            .getOne();

        let sequence = 1;
        if (lastTransaction) {
            const lastSequence = parseInt(lastTransaction.transactionNumber.split('-')[2]);
            sequence = lastSequence + 1;
        }

        return `TRX-${dateStr}-${sequence.toString().padStart(3, '0')}`;
    }

}
