import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Recipe } from './recipe.entity';
import { WpAs3cfItems } from './wp-as3cf-items.entity';

@Entity('recipe_images')
export class RecipeImages {
  @PrimaryColumn({ type: 'int' })
  recipe_id: number;

  @PrimaryColumn({ type: 'bigint' })
  image_id: number;

  @Column({ type: 'varchar', length: 45 })
  type: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  orientation: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeImages)
  @JoinColumn({ name: 'recipe_id', referencedColumnName: 'id' })
  recipe: Recipe;

  @ManyToOne(() => WpAs3cfItems, (as3cfItems) => as3cfItems.recipeImages, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'image_id' })
  as3cfItems: WpAs3cfItems;
}
