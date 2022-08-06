import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { WpPosts } from './wp_posts.entity';
import { WpTermTaxonomy } from './wp_term_taxonomy.entity';


@Entity('wp_term_relationships', { synchronize: false })
export class WpTermRelationships {

  @PrimaryColumn({ type: 'bigint' })
  object_id: number;

  @PrimaryColumn({ type: 'int' })
  term_taxonomy_id: number;

  @Column({ type: 'int' })
  term_order: number;

  @ManyToOne(() => WpPosts, (wpPost) => wpPost.wpTermRelationships, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'object_id' })
  wpPosts: WpPosts;

  @ManyToOne(() => WpTermTaxonomy, (wpTermTaxonomy) => wpTermTaxonomy.wpTermRelationships, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'term_taxonomy_id' })
  wpTermTaxonomy: WpTermTaxonomy;
}
