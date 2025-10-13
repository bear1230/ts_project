import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { TransactionItem } from './transaction-item.entity';

export enum TransactionStatus {
    DRAFT = '작성중',
    COMPLETED = '완료',
    CANCELLED = '취소',
}

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'client_id' })
    clientId: number;

    @ManyToOne(() => Client, (client) => client.transactions, { eager: true })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column({ name: 'transaction_number', length: 50, unique: true })
    transactionNumber: string;

    @Column({ name: 'transaction_date', type: 'date' })
    transactionDate: Date;

    @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    totalAmount: number;

    @Column({ name: 'tax_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    taxAmount: number;

    @Column({ name: 'final_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    finalAmount: number;

    @Column({
        type: 'enum',
        enum: TransactionStatus,
        default: TransactionStatus.DRAFT,
    })
    status: TransactionStatus;

    @Column({ type: 'text', nullable: true })
    note: string;

    @Column({ name: 'created_by', length: 50, nullable: true })
    createdBy: string;

    @OneToMany(() => TransactionItem, (item) => item.transaction, { cascade: true })
    items: TransactionItem[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}