import { registerAs } from '@nestjs/config';

export default registerAs('slugify', () => ({
  replacement: '-',
  remove: undefined,
  lower: true,
  strict: true,
  // locale: 'vi',
  trim: true,
  maxLength: 190,
}));