import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Client } from '../../clients/entities/client.entity';
import { Product } from '../../products/entities/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Client, Product])],
    providers: [SeedService],
    exports: [SeedService],
})
export class SeedModule {}