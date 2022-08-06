import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Recipe } from './recipe.entity';

@Entity('recipe_nutrients')
export class RecipeNutrients {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  recipe_id: number;

  @Column({ type: 'varchar', length: 45, nullable: false })
  name: string;

  @Column({ type: 'int', default: 0 })
  amount: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  unit: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.nutrients)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;
}
