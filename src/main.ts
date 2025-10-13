import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {SeedService} from "./common/seed/seed.service";
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';



async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalInterceptors(new TransformInterceptor());

    app.enableCors({
        origin: 'http://localhost:3001',
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    async function bootstrap() {
        const app = await NestFactory.create(AppModule);

        if (process.env.NODE_ENV === 'development') {
            const seedService = app.get(SeedService);
            await seedService.seed();
        }

        await app.listen(3000);
    }

    const config = new DocumentBuilder()
        .setTitle('거래명세서 관리 API')
        .setDescription(' 거래명세서 관리 백엔드 API')
        .setVersion('1.0')
        .addTag('clients', '거래처 관리')
        .addTag('products', '품목 관리')
        .addTag('transactions', '거래 전표 관리')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
    console.log('Server running  http://localhost:3000');
    console.log('API Documentation: http://localhost:3000/api');
}
bootstrap();