import { Entity, OneToMany,PrimaryGeneratedColumn } from 'typeorm';

import { RecipeTranslation } from './recipe-translation.entity';

@Entity('recipe_translation_id')
export class RecipeTranslationId {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @OneToMany(
    () => RecipeTranslation,
    (recipeTranslation) => recipeTranslation.recipeTranslationId,
  )
  recipeTranslation: RecipeTranslation[];
}