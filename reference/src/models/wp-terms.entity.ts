import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RecipeDeviceType } from './recipe-device-type.entity';
import { WpTermmeta } from './wp_termmeta.entity';

@Entity('wp_terms', { synchronize: false })
export class WpTerms {
  @PrimaryGeneratedColumn({ type: 'int' })
  term_id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  slug: string;

  @Column({ type: 'bigint' })
  term_group: number;

  @Column({ type: 'int', nullable: true })
  term_order: number;

  @OneToMany(() => RecipeDeviceType, (recipeDeviceType) => recipeDeviceType.deviceTypeTerm)
  recipeDeviceType: RecipeDeviceType[];

  @OneToMany(() => WpTermmeta, (deviceTypeCode) => deviceTypeCode.wpTerms)
  @JoinColumn({ name: 'term_id', referencedColumnName: 'term_id' })
  termMeta: WpTermmeta[];
}

// deviceTypeCode
