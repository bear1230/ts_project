import { IsString, IsNotEmpty, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ClientType } from '../entities/client.entity';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    businessNumber: string;

    @IsString()
    @IsOptional()
    contact?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsEnum(ClientType)
    @IsOptional()
    type?: ClientType;
}