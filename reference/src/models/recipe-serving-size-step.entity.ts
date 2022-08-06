import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RecipeServingSize } from './recipe-serving-size.entity';
import { RecipeServingSizeStepTranslation } from './recipe-serving-size-step-translation.entity';

@Entity('recipe_serving_size_step')
export class RecipeServingSizeStep {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  recipe_serving_size_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @Column({ type: 'tinyint' })
  order: number;

  @Column({ type: 'json', nullable: true, default: null })
  device_setting: any;

  @Column({ type: 'text', nullable: true, default: null })
  video_mp4_file_url: string;

  @Column({ type: 'text', nullable: true, default: null })
  video_his_file_url: string;

  @Column({ type: 'text', nullable: true, default: null })
  video_dash_file_url: string;

  @ManyToOne(
    () => RecipeServingSize,
    (recipeServingSize) => recipeServingSize.recipeServingSizeStep,
  )
  @JoinColumn({ name: 'recipe_serving_size_id' })
  recipeServingSize: RecipeServingSize;

  @OneToOne(
    () => RecipeServingSizeStepTranslation,
    (recipeServingSizeStepTranslation) =>
      recipeServingSizeStepTranslation.recipeServingSizeStep,
    { cascade: true }
  )
  recipeServingSizeStepTranslation: RecipeServingSizeStepTranslation;
}