import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Recipe } from './recipe.entity';

@Entity('recipe_meta')
export class RecipeMeta {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  recipe_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  meta_key: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  meta_value: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeMeta)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;
}
