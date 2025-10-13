import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    @ApiOperation({ summary: '거래명세서 작성' })
    @ApiResponse({ status: 201, description: '거래명세서가 성공적으로 작성되었습니다.' })
    create(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionsService.create(createTransactionDto);
    }

    @Get()
    @ApiOperation({ summary: '거래명세서 전체 조회' })
    @ApiResponse({ status: 200, description: '거래명세서 목록 조회 성공' })
    findAll() {
        return this.transactionsService.findAll();
    }

    @Get('statistics')
    @ApiOperation({ summary: '기간별 거래 통계' })
    @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)' })
    @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)' })
    @ApiResponse({ status: 200, description: '통계 조회 성공' })
    getStatistics(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
        return this.transactionsService.getPeriodStatistics(new Date(startDate), new Date(endDate));
    }

    @Get(':id')
    @ApiOperation({ summary: '거래명세서 단건 조회' })
    @ApiParam({ name: 'id', description: '거래 전표 ID' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.transactionsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: '거래명세서 수정' })
    @ApiParam({ name: 'id', description: '거래 전표 ID' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTransactionDto: UpdateTransactionDto) {
        return this.transactionsService.update(id, updateTransactionDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '거래명세서 삭제' })
    @ApiParam({ name: 'id', description: '거래 전표 ID' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.transactionsService.remove(id);
    }
}