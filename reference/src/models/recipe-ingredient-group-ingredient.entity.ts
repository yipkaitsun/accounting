import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RecipeIngredientGroup } from './recipe-ingredient-group.entity';
import { WpPosts } from './wp_posts.entity';

@Entity('recipe_ingredient_group_ingredient')
export class RecipeIngredientGroupIngredient {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  recipe_ingredient_group_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: true, default: null })
  amount: string;

  @Column({ type: 'varchar', length: 45, nullable: true, default: null })
  unit: string;

  @Column({ type: 'int', nullable: true })
  system_ingredient_id: number;

  @Column({ type: 'tinyint', nullable: true })
  order: number;

  @OneToOne(() => WpPosts, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'system_ingredient_id' })
  wpPosts: WpPosts;

  @ManyToOne(() => RecipeIngredientGroup, (recipeIngredientGroup) => recipeIngredientGroup.recipeIngredientGroupIngredients)
  @JoinColumn({ name: 'recipe_ingredient_group_id' })
  recipeIngredientGroup: RecipeIngredientGroup;
}
