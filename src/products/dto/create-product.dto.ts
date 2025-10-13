import { IsString, IsNumber, IsBoolean, IsOptional, Length, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @Length(1, 100)
    name: string;

    @IsString()
    @Length(1, 50)
    code: string;

    @IsString()
    @IsOptional()
    @Length(1, 100)
    specification?: string;

    @IsString()
    @IsOptional()
    @Length(1, 20)
    unit?: string;

    @IsNumber()
    @Min(0)
    unitPrice: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    stock?: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}