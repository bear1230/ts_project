import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TransactionItem } from '../../transactions/entities/transaction-item.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 50, unique: true })
    code: string;

    @Column({ length: 100, nullable: true })
    specification: string;

    @Column({ length: 20, default: '개' })
    unit: string;

    @Column({ name: 'unit_price', type: 'decimal', precision: 15, scale: 2 })
    unitPrice: number;

    @Column({ default: 0 })
    stock: number;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @OneToMany(() => TransactionItem, (item) => item.product)
    transactionItems: TransactionItem[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}