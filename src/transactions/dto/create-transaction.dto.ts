import { IsNumber, IsString, IsDate, IsEnum, IsArray, ValidateNested, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionStatus } from '../entities/transaction.entity';

export class CreateTransactionItemDto {
    @ApiProperty({ description: '품목 ID', example: 1 })
    @IsNumber()
    productId: number;

    @ApiProperty({ description: '수량', example: 10 })
    @IsNumber()
    @Min(1)
    quantity: number;

    @ApiProperty({ description: '단가', example: 1500000 })
    @IsNumber()
    @Min(0)
    unitPrice: number;

    @ApiProperty({ description: '비고', example: '긴급 주문', required: false })
    @IsString()
    @IsOptional()
    note?: string;
}

export class CreateTransactionDto {
    @ApiProperty({ description: '거래처 ID', example: 1 })
    @IsNumber()
    clientId: number;

    @ApiProperty({ description: '거래일', example: '2025-10-13' })
    @IsDate()
    @Type(() => Date)
    transactionDate: Date;

    @ApiProperty({ description: '상태', enum: TransactionStatus, required: false })
    @IsEnum(TransactionStatus)
    @IsOptional()
    status?: TransactionStatus;

    @ApiProperty({ description: '비고', example: '분기말 대량 주문', required: false })
    @IsString()
    @IsOptional()
    note?: string;

    @ApiProperty({ description: '작성자', example: '홍길동', required: false })
    @IsString()
    @IsOptional()
    createdBy?: string;

    @ApiProperty({ description: '거래 상세 항목', type: [CreateTransactionItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTransactionItemDto)
    items: CreateTransactionItemDto[];
}