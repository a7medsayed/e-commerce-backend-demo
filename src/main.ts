import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder , SwaggerModule } from '@nestjs/swagger'

require('dotenv').config()

async function bootstrap() {
  console.log('development: ' ,process.env.NODE_ENV );
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Api Documentation')
  .setDescription('this is an E-Commerce App Services')
  .setVersion('1.0.0')
  .build();
  const document = SwaggerModule.createDocument(app , options);

  SwaggerModule.setup('api-docs' , app , document);
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
