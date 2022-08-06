import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { WpTermRelationships } from './wp_term_relationships.entity';
import { WpTermmeta } from './wp_termmeta.entity';

@Entity('wp_term_taxonomy', { synchronize: false })
export class WpTermTaxonomy {
  @PrimaryGeneratedColumn({ type: 'int' })
  term_taxonomy_id: number;

  @Column({ type: 'int' })
  term_id: number;

  @Column({ type: 'varchar', length: 32 })
  taxonomy: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'int' })
  parent: number;

  @Column({ type: 'int' })
  count: number;

  @ManyToMany(() => WpTermRelationships, (wpTermRelationships) => wpTermRelationships.wpTermTaxonomy)
  wpTermRelationships: WpTermRelationships[];

  @OneToMany(() => WpTermmeta, wpTermmeta => wpTermmeta.wpTermTaxonomy)
  wpTermMeta: WpTermmeta[];
}
