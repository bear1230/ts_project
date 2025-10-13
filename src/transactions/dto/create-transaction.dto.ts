import { IsNumber, IsString, IsDate, IsEnum, IsArray, ValidateNested, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionStatus } from '../entities/transaction.entity';

export class CreateTransactionItemDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    unitPrice: number;

    @IsString()
    @IsOptional()
    note?: string;
}

export class CreateTransactionDto {
    @IsNumber()
    clientId: number;

    @IsDate()
    @Type(() => Date)
    transactionDate: Date;

    @IsEnum(TransactionStatus)
    @IsOptional()
    status?: TransactionStatus;

    @IsString()
    @IsOptional()
    note?: string;

    @IsString()
    @IsOptional()
    createdBy?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTransactionItemDto)
    items: CreateTransactionItemDto[];
}