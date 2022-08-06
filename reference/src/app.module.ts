import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConf from './config/app';
import databaseConf from './config/database';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { AppLoggerMiddleware } from './middleware/logger.middleware';
import { AppRequestHeaderValidatorMiddleware } from './middleware/request-header-validator.middleware';
import { UtilsModule } from './modules/utils/utils.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    LoggerModule.forRoot(),

    // Include app global config
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [appConf],
    }),

    // Include database config
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [databaseConf],
        }),
      ],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    // Custom Modules
    UtilsModule,
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        AppLoggerMiddleware,
        AppRequestHeaderValidatorMiddleware,
      )
      .exclude(
        { path: '/', method: RequestMethod.GET }
      )
      .forRoutes('*');
  }
}
