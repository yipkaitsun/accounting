import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TgiRecipeStepTranslationId } from './tgi-recipe-step-translation-id.entity';

@Entity('tgi_user_recipe_notes', { synchronize: false })
export class TgiUserRecipeStepNotes {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', width: 20, unsigned: true })
  user_id: number;

  @Column({ type: 'bigint', width: 20, unsigned: true })
  recipe_trid: number;

  @Column({ type: 'bigint', width: 20, unsigned: true })
  recipe_step_translation_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'mediumtext' })
  note: string;

  @Column({ type: 'datetime' })
  last_updated_time: Date;

  @OneToOne(() => TgiRecipeStepTranslationId)
  @JoinColumn({ name: 'recipe_step_translation_id' })
  tgiRecipeStepTranslationId: TgiRecipeStepTranslationId;
}
