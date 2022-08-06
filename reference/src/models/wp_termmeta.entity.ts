import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { WpTermTaxonomy } from './wp_term_taxonomy.entity';
import { WpTerms } from './wp-terms.entity';

@Entity('wp_termmeta', { synchronize: false })
export class WpTermmeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  meta_id: number;

  @Column({ type: 'int' })
  term_id: number;

  @Column({ type: 'varchar', length: 255 })
  meta_key: string;

  @Column({ type: 'longtext' })
  meta_value: string;

  @ManyToOne(() => WpTermTaxonomy, (wpTermTaxonomy) => wpTermTaxonomy.wpTermMeta, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'term_id', referencedColumnName: 'term_id' })
  wpTermTaxonomy: WpTermTaxonomy;

  @ManyToOne(() => WpTerms, (wpTerms) => wpTerms.termMeta, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'term_id', referencedColumnName: 'term_id' })
  wpTerms: WpTerms;
}
