import {
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity('wp_icl_locale_map', { synchronize: false })
export class WpIclLocaleMap {
  @PrimaryColumn({ type: 'varchar', length: 7 })
  code: string;

  @PrimaryColumn({ type: 'varchar', length: 35 })
  locale: string;
}