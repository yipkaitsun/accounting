import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RecipeImages } from './recipe-images.entity';

@Entity('wp_as3cf_items', { synchronize: false })
export class WpAs3cfItems {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 18 })
  provider: string;

  @Column({ type: 'varchar', length: 255 })
  region: string;

  @Column({ type: 'varchar', length: 255 })
  bucket: string;

  @Column({ type: 'varchar', length: 1024 })
  path: string;

  @Column({ type: 'varchar', length: 1024 })
  original_path: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  is_private: number;

  @Column({ type: 'varchar', length: 18 })
  source_type: string;

  @Column({ type: 'int', width: 20 })
  source_id: number;

  @Column({ type: 'varchar', length: 1024 })
  source_path: string;

  @Column({ type: 'varchar', length: 1024 })
  original_source_path: string;

  @Column({ type: 'longtext', nullable: true })
  extra_info: string;

  @OneToMany(() => RecipeImages, (recipeImages) => recipeImages.as3cfItems)
  recipeImages: RecipeImages[];
  /*
    @OneToMany(() => WpTermmeta, (wpTermmeta) => wpTermmeta.wpAs3cfItems)
    wpTermMeta: WpTermmeta[]; */
}
