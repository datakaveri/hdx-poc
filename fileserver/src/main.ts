import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:4300' });

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('HDX Fileserver')
      .setDescription('Uploads/downloads dataset & service sample files, backed by MinIO.')
      .setVersion('1.0')
      .addBearerAuth()
      .build(),
  );
  SwaggerModule.setup('api-docs', app, document);

  const port = Number(process.env.PORT ?? 4001);
  await app.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`Fileserver listening on :${port} (docs at /api-docs)`);
}

bootstrap();
