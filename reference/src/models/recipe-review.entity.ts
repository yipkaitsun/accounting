import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Recipe } from './recipe.entity';

@Entity('recipe_review')
export class RecipeReview {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  recipe_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  rating: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.review)
  @JoinColumn({ name: 'recipe_id', referencedColumnName: 'id' })
  recipe: Recipe;
}
