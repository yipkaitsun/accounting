import { registerAs } from '@nestjs/config';

export const SWAGGER_CONFIG = {
  TITLE: 'Swagger Doc',
  DESCRIPTION: 'Swagger Doc'
};

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  SWAGGER_CONFIG,
}));
