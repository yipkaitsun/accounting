import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Group } from './entity/group.entity';
import { Transaction } from './entity/transaction.entity';
import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, Transaction]),
  TypeOrmModule.forRoot({
    logging:"all",
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'accounting_db',
    entities: [Transaction],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
