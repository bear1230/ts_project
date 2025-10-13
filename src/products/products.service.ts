import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) {}

    async findAll(): Promise<Product[]> {
        return await this.productsRepository.find({
            where: { isActive: true },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { id },
        });

        if (!product) {
            throw new NotFoundException(`품목 ID ${id}를 찾을 수 없습니다.`);
        }

        return product;
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productsRepository.create(createProductDto);
        return await this.productsRepository.save(product);
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        Object.assign(product, updateProductDto);
        return await this.productsRepository.save(product);
    }

    async remove(id: number): Promise<void> {
        const product = await this.findOne(id);
        await this.productsRepository.remove(product);
    }

    async getProductStatistics(productId: number) {
        return await this.productsRepository
            .createQueryBuilder('product')
            .leftJoin('product.transactionItems', 'item')
            .leftJoin('item.transaction', 'transaction')
            .select('product.id', 'productId')
            .addSelect('product.name', 'productName')
            .addSelect('SUM(item.quantity)', 'totalQuantity')
            .addSelect('SUM(item.amount)', 'totalAmount')
            .addSelect('COUNT(DISTINCT transaction.client_id)', 'clientCount')
            .where('product.id = :productId', { productId })
            .andWhere('transaction.status = :status', { status: '완료' })
            .groupBy('product.id')
            .getRawOne();
    }
}