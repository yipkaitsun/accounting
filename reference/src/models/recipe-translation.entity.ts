
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Recipe } from './recipe.entity';
import { RecipeTranslationId } from './recipe-translation-id.entity';

@Index(['recipe_id', 'language_locale'])
@Index(['recipe_translation_id', 'language_locale'], { unique: true })
@Entity('recipe_translation')
export class RecipeTranslation {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  recipe_translation_id: number;

  @Column({ type: 'int' })
  recipe_id: number;

  @Index()
  @Column({ type: 'varchar', length: 7 })
  language_locale: string;

  @Column({ type: 'varchar', length: 7, nullable: true, default: null })
  source_language_locale: string;

  @OneToOne(() => Recipe, (recipe) => recipe.translation, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @ManyToOne(
    () => RecipeTranslationId,
    (recipeTranslationId) => recipeTranslationId.recipeTranslation,
    { cascade: true }
  )
  @JoinColumn({ name: 'recipe_translation_id' })
  recipeTranslationId: RecipeTranslationId;
}
