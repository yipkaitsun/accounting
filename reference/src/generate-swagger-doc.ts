import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SWAGGER_CONFIG } from './config/app';
import {SwaggerDocGeneratorUtilsService} from './modules/utils/services/swagger-doc-generator-utils.service';


// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false
  });
  await app.init();

  const swaggerDocGenerator = app.get(SwaggerDocGeneratorUtilsService);

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.TITLE)
    .setDescription(SWAGGER_CONFIG.DESCRIPTION)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  await swaggerDocGenerator.generateFile(document, process.env.APP_ENV);
}
void bootstrap();
