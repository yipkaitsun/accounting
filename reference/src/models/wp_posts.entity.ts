import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RecipeIngredientGroupIngredient } from './recipe-ingredient-group-ingredient.entity';
import { WpTermRelationships } from './wp_term_relationships.entity';

@Entity('wp_posts', { synchronize: false })
export class WpPosts {
  @PrimaryGeneratedColumn({ type: 'int' })
  ID: number;

  @Column({ type: 'int' })
  post_author: number;

  @Column({ type: 'datetime' })
  post_date: Date;

  @Column({ type: 'datetime' })
  post_date_gmt: Date;

  @Column({ type: 'longtext' })
  post_content: string;

  @Column({ type: 'text' })
  post_title: string;

  @Column({ type: 'text' })
  post_excerpt: string;

  @Column({ type: 'varchar', length: 20 })
  post_status: string;

  @Column({ type: 'varchar', length: 20 })
  comment_status: string;

  @Column({ type: 'varchar', length: 20 })
  ping_status: string;

  @Column({ type: 'varchar', length: 255 })
  post_password: string;

  @Column({ type: 'varchar', length: 200 })
  post_name: string;

  @Column({ type: 'text' })
  to_ping: string;

  @Column({ type: 'text' })
  pinged: string;

  @Column({ type: 'datetime' })
  post_modified: Date;

  @Column({ type: 'datetime' })
  post_modified_gmt: Date;

  @Column({ type: 'longtext' })
  post_content_filtered: string;

  @Column({ type: 'bigint' })
  post_parent: number;

  @Column({ type: 'varchar', length: 255 })
  guid: string;

  @Column({ type: 'int' })
  menu_order: number;

  @Column({ type: 'varchar', length: 20 })
  post_type: string;

  @Column({ type: 'varchar', length: 100 })
  post_mime_type: string;

  @Column({ type: 'bigint' })
  comment_count: number;

  @OneToOne(
    () => RecipeIngredientGroupIngredient)
  recipeIngredientGroupIngredient: RecipeIngredientGroupIngredient;

  @OneToMany(
    () => WpTermRelationships, (wpTermRelationships) => wpTermRelationships.wpPosts, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'ID' })
  wpTermRelationships: WpTermRelationships[];
}
