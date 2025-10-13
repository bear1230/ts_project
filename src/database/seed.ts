import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';

async function seed() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    try {
        // 샘플 거래처 데이터
        await dataSource.query(`
      INSERT INTO clients (name, business_number, contact, email, address, type) VALUES
      ('테크솔루션', '123-45-67890', '02-1234-5678', 'tech@example.com', '서울시 강남구 테헤란로 123', '매출처'),
      ('한국무역', '234-56-78901', '02-2345-6789', 'trade@example.com', '서울시 중구 세종대로 45', '매출처'),
      ('글로벌산업', '345-67-89012', '02-3456-7890', 'global@example.com', '경기도 성남시 분당구 판교역로 235', '매입처')
      ON CONFLICT (business_number) DO NOTHING;
    `);

        // 샘플 품목 데이터
        await dataSource.query(`
      INSERT INTO products (name, code, specification, unit, unit_price, stock, is_active) VALUES
      ('노트북', 'PROD-001', 'LG그램 15인치', '개', 1500000, 100, true),
      ('모니터', 'PROD-002', '27인치 FHD', '개', 300000, 200, true),
      ('키보드', 'PROD-003', '기계식 키보드', '개', 150000, 300, true),
      ('마우스', 'PROD-004', '무선 마우스', '개', 50000, 500, true)
      ON CONFLICT (code) DO NOTHING;
    `);

        console.log('샘플 데이터 생성 완료');
    } catch (error) {
        console.error('샘플 데이터 생성 실패:', error);
    } finally {
        await app.close();
    }
}

seed();