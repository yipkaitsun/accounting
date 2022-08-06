import { ConfigModule } from '@nestjs/config';

import { DataSource, DataSourceOptions } from 'typeorm';

import dbConfiguration from './database';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfiguration],
});

export default new DataSource(dbConfiguration() as DataSourceOptions);
