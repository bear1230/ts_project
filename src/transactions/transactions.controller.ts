import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Get()
    findAll() {
        return this.transactionsService.findAll();
    }

    @Get('statistics')
    getStatistics(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
        return this.transactionsService.getPeriodStatistics(new Date(startDate), new Date(endDate));
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.transactionsService.findOne(id);
    }

    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionsService.create(createTransactionDto);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTransactionDto: UpdateTransactionDto) {
        return this.transactionsService.update(id, updateTransactionDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.transactionsService.remove(id);
    }
}