import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Recipe } from './recipe.entity';
import { RecipeIngredientGroup } from './recipe-ingredient-group.entity';
import { RecipeServingSizeStep } from './recipe-serving-size-step.entity';
@Entity('recipe_serving_size')
export class RecipeServingSize {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  recipe_id: number;

  @Column({ type: 'tinyint', default: false })
  is_default: boolean;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'varchar', length: 45 })
  serving_unit: string;

  @Column({ type: 'text', nullable: true })
  instructions: string;

  @Column({ type: 'int' })
  ready_in_time: number;

  @Column({ type: 'int' })
  preparation_time: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.servingSizes)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @OneToMany(
    () => RecipeServingSizeStep,
    (recipeServingSizeStep) => recipeServingSizeStep.recipeServingSize,
    { cascade: true }
  )
  recipeServingSizeStep: RecipeServingSizeStep[];

  @OneToMany(
    () => RecipeIngredientGroup,
    (recipeIngredientGroup) => recipeIngredientGroup.recipeServingSize,
    { cascade: true }
  )
  recipeIngredientGroup: RecipeIngredientGroup[];
}
