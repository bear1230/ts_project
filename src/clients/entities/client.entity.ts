import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';

export enum ClientType {
    CUSTOMER = '매출처',
    SUPPLIER = '매입처',
}

@Entity('clients')
export class Client {  // ✅ export 있음
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ name: 'business_number', length: 20, unique: true })
    businessNumber: string;

    @Column({ length: 50, nullable: true })
    contact: string;

    @Column({ length: 100, nullable: true })
    email: string;

    @Column({ length: 200, nullable: true })
    address: string;

    @Column({
        type: 'enum',
        enum: ClientType,
        default: ClientType.CUSTOMER,
    })
    type: ClientType;

    @OneToMany(() => Transaction, (transaction) => transaction.client)
    transactions: Transaction[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}