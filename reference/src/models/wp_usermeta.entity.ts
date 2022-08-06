import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { WpUser } from './wp_users.entity';

@Entity('wp_usermeta', { synchronize: false })
export class WpUsermeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  umeta_id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_key: string;

  @Column({ type: 'longtext', nullable: true })
  meta_value: string;

  @ManyToOne(() => WpUser, (wpUsers) => wpUsers.wpUsermeta, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id' })
  wpUser: WpUser;
}
