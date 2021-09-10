import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ParsePaginationRequestPipe } from './pagination/parse-pagination-request.pipe';
import { ParseSortingRequestPipe } from './sorting/sorting-request.pipe';

function useSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Marketplace api')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/index.html', app, document);
}

function useGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(new ParsePaginationRequestPipe());
  app.useGlobalPipes(new ParseSortingRequestPipe());
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useSwagger(app);
  useGlobalPipes(app);

  await app.listen(3000);
}
bootstrap();
