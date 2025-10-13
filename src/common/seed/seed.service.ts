import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client, ClientType } from '../../clients/entities/client.entity';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(Client)
        private clientsRepository: Repository<Client>,
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) {}

    async seed() {
        const clients = [
            {
                name: '(주)테크솔루션',
                businessNumber: '123-45-67890',
                contact: '02-1234-5678',
                email: 'tech@example.com',
                type: ClientType.CUSTOMER,
            },
            {
                name: '한국무역',
                businessNumber: '234-56-78901',
                contact: '02-2345-6789',
                email: 'trade@example.com',
                type: ClientType.CUSTOMER,
            },
            {
                name: '글로벌산업',
                businessNumber: '345-67-89012',
                contact: '02-3456-7890',
                email: 'global@example.com',
                type: ClientType.SUPPLIER,
            },
        ];

        for (const clientData of clients) {
            const exists = await this.clientsRepository.findOne({
                where: { businessNumber: clientData.businessNumber },
            });
            if (!exists) {
                await this.clientsRepository.save(clientData);
            }
        }


        const products = [
            { name: '노트북', code: 'PROD-001', unitPrice: 1500000, stock: 50 },
            { name: '모니터', code: 'PROD-002', unitPrice: 300000, stock: 100 },
            { name: '키보드', code: 'PROD-003', unitPrice: 150000, stock: 200 },
            { name: '마우스', code: 'PROD-004', unitPrice: 50000, stock: 300 },
        ];

        for (const productData of products) {
            const exists = await this.productsRepository.findOne({
                where: { code: productData.code },
            });
            if (!exists) {
                await this.productsRepository.save(productData);
            }
        }

        console.log('샘플 데이터 생성 완료!');
    }
}