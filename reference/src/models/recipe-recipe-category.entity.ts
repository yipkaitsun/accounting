import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

import { Recipe } from './recipe.entity';
import { WpTerms } from './wp-terms.entity';

@Entity('recipe_recipe_category')
export class RecipeCategory {
  @PrimaryColumn({ type: 'int' })
  recipe_id: number;

  @PrimaryColumn({ type: 'bigint' })
  recipe_category_id: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.categories)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @OneToOne(() => WpTerms, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'recipe_category_id' })
  wpTerms: WpTerms;

}
