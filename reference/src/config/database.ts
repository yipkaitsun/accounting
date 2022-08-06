import { registerAs } from '@nestjs/config';

import { Recipe } from '../models/recipe.entity';
import { RecipeDeviceType } from '../models/recipe-device-type.entity';
import { RecipeImages } from '../models/recipe-images.entity';
import { RecipeIngredientGroup } from '../models/recipe-ingredient-group.entity';
import { RecipeIngredientGroupIngredient } from '../models/recipe-ingredient-group-ingredient.entity';
import { RecipeMeta } from '../models/recipe-meta.entity';
import { RecipeNutrients } from '../models/recipe-nutrients.entity';
import { RecipeCategory } from '../models/recipe-recipe-category.entity';
import { RecipeReview } from '../models/recipe-review.entity';
import { RecipeServingSize } from '../models/recipe-serving-size.entity';
import { RecipeServingSizeStep } from '../models/recipe-serving-size-step.entity';
import { RecipeServingSizeStepTranslation } from '../models/recipe-serving-size-step-translation.entity';
import { RecipeTranslation } from '../models/recipe-translation.entity';
import { RecipeTranslationId } from '../models/recipe-translation-id.entity';
import { TgiRecipeStepTranslationId } from '../models/tgi-recipe-step-translation-id.entity';
import { TgiUserRecipeStepNotes } from '../models/tgi-user-recipe-notes.entity';
import { WpIclLocaleMap } from '../models/wp_icl_locale_map.entity';
import { WpIclTranslations } from '../models/wp_icl_translations.entity';
import { WpPosts } from '../models/wp_posts.entity';
import { WpTermRelationships } from '../models/wp_term_relationships.entity';
import { WpTermTaxonomy } from '../models/wp_term_taxonomy.entity';
import { WpTermmeta } from '../models/wp_termmeta.entity';
import { WpUsermeta } from '../models/wp_usermeta.entity';
import { WpUser } from '../models/wp_users.entity';
import { WpAs3cfItems } from '../models/wp-as3cf-items.entity';
import { Wplike } from '../models/wp-like.entity';
import { WpTerms } from '../models/wp-terms.entity';

export default registerAs('database', () => ({
  type: 'mysql',
  logging: false,
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    Recipe,
    RecipeDeviceType,
    RecipeServingSize,
    RecipeServingSizeStep,
    RecipeServingSizeStepTranslation,
    RecipeCategory,
    RecipeNutrients,
    RecipeMeta,
    RecipeTranslation,
    RecipeTranslationId,
    RecipeImages,
    RecipeIngredientGroup,
    RecipeIngredientGroupIngredient,
    WpAs3cfItems,
    WpUser,
    Wplike,
    WpIclTranslations,
    WpTerms,
    WpUsermeta,
    WpTermmeta,
    WpIclLocaleMap,
    WpTermRelationships,
    WpTermTaxonomy,
    WpPosts,
    WpIclLocaleMap,
    RecipeReview,
    TgiRecipeStepTranslationId,
    WpIclTranslations,
    TgiUserRecipeStepNotes,
  ],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  name: 'default',
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
}));
