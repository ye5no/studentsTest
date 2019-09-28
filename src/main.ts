import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from 'nestjs-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

// swagger options
const options = new DocumentBuilder()
  .setTitle('Students API')
  .addOAuth2()
  .build();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const port = ConfigService.get('express').port;
  await app.listen(port);
  console.log(`Nest on ${port}`);
}

(async () => {
  await bootstrap();
})();
