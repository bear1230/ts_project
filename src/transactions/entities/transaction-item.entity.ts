import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('transaction_items')
export class TransactionItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'transaction_id' })
    transactionId: number;

    @ManyToOne(() => Transaction, (transaction) => transaction.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'transaction_id' })
    transaction: Transaction;

    @Column({ name: 'product_id' })
    productId: number;

    @ManyToOne(() => Product, (product) => product.transactionItems, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    quantity: number;

    @Column({ name: 'unit_price', type: 'decimal', precision: 15, scale: 2 })
    unitPrice: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    amount: number;

    @Column({ length: 200, nullable: true })
    note: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}