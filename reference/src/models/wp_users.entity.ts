import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Recipe } from './recipe.entity';
import { WpUsermeta } from './wp_usermeta.entity';
import { Wplike } from './wp-like.entity';

@Entity('wp_users', { synchronize: false })
export class WpUser {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: string;

  @Index('user_login_key')
  @Column({ type: 'varchar', length: 60, default: '' })
  user_login: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  user_pass: string;

  @Index('user_nicename')
  @Column({ type: 'varchar', length: 50, default: '' })
  user_nicename: string;

  @Index('user_email')
  @Column({ type: 'varchar', length: 100, default: '' })
  user_email: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  user_url: string;

  @Column({ type: 'datetime', default: '1970-01-01 00:00:00' })
  user_registered: Date;

  @Column({ type: 'varchar', length: 255, default: '' })
  user_activation_key: string;

  @Column({ type: 'int', default: 0 })
  user_status: number;

  @Column({ type: 'varchar', length: 250, default: '' })
  display_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  legacy_uid: string;

  @Index('display_info_updated_at')
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  display_info_updated_at: Date;

  @OneToMany(() => Recipe, (recipe) => recipe.author)
  recipe: Recipe[];

  @OneToMany(
    () => Wplike,
    (wplike) => wplike.wpUser,
    { createForeignKeyConstraints: false }
  )
  wpLike: Wplike[];

  @OneToMany(() => WpUsermeta, (wpUsermeta => wpUsermeta.wpUser))
  wpUsermeta: WpUsermeta[];
}
