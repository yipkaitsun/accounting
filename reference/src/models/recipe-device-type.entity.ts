import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Recipe } from './recipe.entity';
import { WpTerms } from './wp-terms.entity';

@Entity('recipe_device_type')
export class RecipeDeviceType {
  @PrimaryColumn({ type: 'int' })
  device_type_id: number;

  @PrimaryColumn({ type: 'int' })
  recipe_id: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.deviceTypes)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @ManyToOne(() => WpTerms, (wpTerms) => wpTerms.recipeDeviceType, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'device_type_id', referencedColumnName: 'term_id' })
  deviceTypeTerm: WpTerms;
}
