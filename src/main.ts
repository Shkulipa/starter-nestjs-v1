import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from 'src/models/app/app.module';
import { ConfigService } from '@nestjs/config/dist/config.service';

async function bootstrap() {
  const logger = new Logger('Main (main.ts)');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder().setTitle('Retic API Doc').build();
  app.setGlobalPrefix(`api`);
  app.setViewEngine('ejs');

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const clientPort = parseInt(configService.get('CLIENT_PORT'));
  const corsWebSites = String(configService.get('CORS_WEBSITES')) || '';
  app.enableCors({
    origin: [
      `http://localhost:${port}`,
      new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
      ...corsWebSites.split(','),
    ],
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`Server running on port ${port}`);
}
bootstrap();
