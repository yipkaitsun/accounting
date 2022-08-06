import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RecipeServingSizeStepTranslation } from './recipe-serving-size-step-translation.entity';

@Entity('tgi_recipe_step_translation_id', { synchronize: false })
export class TgiRecipeStepTranslationId {
  @PrimaryGeneratedColumn({ type: 'int' })
  ID: number;

  @OneToMany(
    () => RecipeServingSizeStepTranslation,
    (recipeServingSizeStepTranslation) =>
      recipeServingSizeStepTranslation.tgiRecipeStepTranslationId,
  )
  recipeServingSizeStepTranslation: RecipeServingSizeStepTranslation[];
}
