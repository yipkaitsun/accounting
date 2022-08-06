import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

import { RecipeServingSizeStep } from './recipe-serving-size-step.entity';
import { TgiRecipeStepTranslationId } from './tgi-recipe-step-translation-id.entity';

@Entity('recipe_serving_size_step_translation')
export class RecipeServingSizeStepTranslation {
  @PrimaryColumn({ type: 'int' })
  recipe_serving_size_step_id: number;

  @PrimaryColumn({ type: 'int' })
  translation_id: number;

  @OneToOne(
    () => RecipeServingSizeStep,
    (recipeServingSizeStep) =>
      recipeServingSizeStep.recipeServingSizeStepTranslation,
  )
  @JoinColumn({ name: 'recipe_serving_size_step_id' })
  recipeServingSizeStep: RecipeServingSizeStep;

  @ManyToOne(
    () => TgiRecipeStepTranslationId,
    (tgiRecipeStepTranslationId) =>
      tgiRecipeStepTranslationId.recipeServingSizeStepTranslation,
    { cascade: true, createForeignKeyConstraints: false }
  )
  @JoinColumn({ name: 'translation_id' })
  tgiRecipeStepTranslationId: TgiRecipeStepTranslationId;
}
