import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Post()
    @ApiOperation({ summary: '거래처 등록' })
    @ApiResponse({ status: HttpStatus.CREATED, description: '거래처가 성공적으로 등록되었습니다.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: '잘못된 요청입니다.' })
    create(@Body() createClientDto: CreateClientDto) {
        return this.clientsService.create(createClientDto);
    }

    @Get()
    @ApiOperation({ summary: '거래처 전체 조회' })
    @ApiResponse({ status: HttpStatus.OK, description: '거래처 목록을 반환합니다.' })
    findAll() {
        return this.clientsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: '거래처 단건 조회' })
    @ApiParam({ name: 'id', description: '거래처 ID' })
    @ApiResponse({ status: HttpStatus.OK, description: '거래처 정보를 반환합니다.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '거래처를 찾을 수 없습니다.' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.clientsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: '거래처 정보 수정' })
    @ApiParam({ name: 'id', description: '거래처 ID' })
    @ApiResponse({ status: HttpStatus.OK, description: '거래처가 수정되었습니다.' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateClientDto: UpdateClientDto) {
        return this.clientsService.update(id, updateClientDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '거래처 삭제' })
    @ApiParam({ name: 'id', description: '거래처 ID' })
    @ApiResponse({ status: HttpStatus.OK, description: '거래처가 삭제되었습니다.' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.clientsService.remove(id);
    }

    @Get(':id/statistics')
    @ApiOperation({ summary: '거래처별 통계 조회' })
    @ApiParam({ name: 'id', description: '거래처 ID' })
    @ApiResponse({ status: HttpStatus.OK, description: '거래처 통계를 반환합니다.' })
    getStatistics(@Param('id', ParseIntPipe) id: number) {
        return this.clientsService.getClientStatistics(id);
    }
}