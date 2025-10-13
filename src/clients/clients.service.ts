import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private clientsRepository: Repository<Client>,
    ) {}

    async findAll(): Promise<Client[]> {
        return await this.clientsRepository.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Client> {
        const client = await this.clientsRepository.findOne({
            where: { id },
            relations: ['transactions'],
        });

        if (!client) {
            throw new NotFoundException(`거래처 ID ${id}를 찾을 수 없습니다.`);
        }

        return client;
    }

    async create(createClientDto: CreateClientDto): Promise<Client> {
        const client = this.clientsRepository.create(createClientDto);
        return await this.clientsRepository.save(client);
    }

    async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
        const client = await this.findOne(id);
        Object.assign(client, updateClientDto);
        return await this.clientsRepository.save(client);
    }

    async remove(id: number): Promise<void> {
        const client = await this.findOne(id);
        await this.clientsRepository.remove(client);
    }

    async getClientStatistics(clientId: number) {
        return await this.clientsRepository
            .createQueryBuilder('client')
            .leftJoin('client.transactions', 'transaction')
            .select('client.id', 'clientId')
            .addSelect('client.name', 'clientName')
            .addSelect('COUNT(transaction.id)', 'transactionCount')
            .addSelect('SUM(transaction.total_amount)', 'totalAmount')
            .addSelect('AVG(transaction.total_amount)', 'averageAmount')
            .where('client.id = :clientId', { clientId })
            .andWhere('transaction.status = :status', { status: '완료' })
            .groupBy('client.id')
            .getRawOne();
    }
}