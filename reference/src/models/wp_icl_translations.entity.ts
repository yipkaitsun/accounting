import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Wplike } from './wp-like.entity';

@Entity('wp_icl_translations', { synchronize: false })
export class WpIclTranslations {
  @PrimaryGeneratedColumn({ type: 'int' })
  translation_id: number;

  @Column({ type: 'varchar', length: 60, default: 'post_post' })
  element_type: string;

  @Column({ type: 'bigint', width: 20, nullable: true, default: null })
  element_id: number;

  @Column({ type: 'bigint', width: 20 })
  trid: number;

  @Column({ type: 'varchar', length: 7 })
  language_code: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  source_language_code: string;

  @OneToMany(
    () => Wplike,
    (wplike) => wplike.wpIclTranslations
  )
  wpLike: Wplike[];
}
