import { Module } from '@nestjs/common';

import { SwaggerDocGeneratorUtilsService } from './services/swagger-doc-generator-utils.service';

@Module({
  providers: [SwaggerDocGeneratorUtilsService],
  exports: [SwaggerDocGeneratorUtilsService]
})
export class UtilsModule {}
