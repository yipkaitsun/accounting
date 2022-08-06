import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RecipeIngredientGroupIngredient } from './recipe-ingredient-group-ingredient.entity';
import { RecipeServingSize } from './recipe-serving-size.entity';

@Entity('recipe_ingredient_group')
export class RecipeIngredientGroup {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'int' })
  recipe_serving_size_id: number;

  @Column({ type: 'tinyint', nullable: true })
  is_default: boolean;

  @ManyToOne(
    () => RecipeServingSize,
    (recipeServingSize) => recipeServingSize.recipeIngredientGroup,
  )
  @JoinColumn({ name: 'recipe_serving_size_id' })
  recipeServingSize: RecipeServingSize;

  @OneToMany(
    () => RecipeIngredientGroupIngredient,
    (recipeIngredientGroupIngredient) =>
      recipeIngredientGroupIngredient.recipeIngredientGroup,
    { cascade: true }
  )
  recipeIngredientGroupIngredients: RecipeIngredientGroupIngredient[];
}
