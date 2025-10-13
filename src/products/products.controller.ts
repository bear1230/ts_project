import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @ApiOperation({ summary: '품목 등록' })
    @ApiResponse({ status: 201, description: '품목이 성공적으로 등록되었습니다.' })
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: '품목 전체 조회' })
    @ApiResponse({ status: 200, description: '품목 목록 조회 성공' })
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: '품목 단건 조회' })
    @ApiParam({ name: 'id', description: '품목 ID' })
    @ApiResponse({ status: 200, description: '품목 조회 성공' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: '품목 수정' })
    @ApiParam({ name: 'id', description: '품목 ID' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '품목 삭제' })
    @ApiParam({ name: 'id', description: '품목 ID' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.remove(id);
    }

    @Get(':id/statistics')
    @ApiOperation({ summary: '품목별 판매 통계' })
    @ApiParam({ name: 'id', description: '품목 ID' })
    getStatistics(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.getProductStatistics(id);
    }
}