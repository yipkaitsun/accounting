import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecipeTranslation } from 'src/models/recipe-translation.entity';

import { Recipe } from '..//models/recipe.entity';
import slugifyConf from '../config/slugify';
import { WpIclLocaleMap } from '../models/wp_icl_locale_map.entity';
import { WpAs3cfItems } from '../models/wp-as3cf-items.entity';
import { WordpressService } from '../wordpress/wordpress.service';
import { RecipeTranslationService } from './recipe-translation.service';
import { RecipesController } from './recipes.controller';
import { RecipesControllerHandler } from './recipes.controller.handler';
import { RecipesService } from './recipes.service';
import { SlugifyProvider } from './slugify.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, WpIclLocaleMap, WpAs3cfItems, RecipeTranslation]), CacheModule.register(),
    ConfigModule.forRoot({
      load: [slugifyConf],
    }),
  ],
  controllers: [RecipesController],
  providers: [
    RecipesControllerHandler,
    WordpressService,
    RecipesService,
    RecipeTranslationService,
    SlugifyProvider
  ],
})
export class RecipesModule { }
