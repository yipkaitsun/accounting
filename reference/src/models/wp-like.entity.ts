import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { WpIclTranslations } from './wp_icl_translations.entity';
import { WpUser } from './wp_users.entity';

@Entity('wp_like', { synchronize: false })
export class Wplike {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  trid: number;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  is_active: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne(
    () => WpUser,
    (wpUser) => wpUser.wpLike
  )
  @JoinColumn({ name: 'user_id' })
  wpUser: WpUser;

  @ManyToOne(
    () => WpIclTranslations,
    (wpIclTranslations) => wpIclTranslations.wpLike
  )
  @JoinColumn({ name: 'trid' })
  wpIclTranslations: WpIclTranslations;
}
