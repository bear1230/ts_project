import { IsString, IsNumber, IsBoolean, IsOptional, Length, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ description: '품목명', example: '노트북' })
    @IsString()
    @Length(1, 100)
    name: string;

    @ApiProperty({ description: '품목코드', example: 'PROD-001' })
    @IsString()
    @Length(1, 50)
    code: string;

    @ApiProperty({ description: '규격', example: 'LG그램 15인치', required: false })
    @IsString()
    @IsOptional()
    @Length(1, 100)
    specification?: string;

    @ApiProperty({ description: '단위', example: '개', required: false })
    @IsString()
    @IsOptional()
    @Length(1, 20)
    unit?: string;

    @ApiProperty({ description: '단가', example: 1500000 })
    @IsNumber()
    @Min(0)
    unitPrice: number;

    @ApiProperty({ description: '재고수량', example: 50, required: false })
    @IsNumber()
    @IsOptional()
    @Min(0)
    stock?: number;

    @ApiProperty({ description: '사용여부', example: true, required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}