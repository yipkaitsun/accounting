import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entity/transaction.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) { }


  async getUserBalanceByGroup(startDay: string, endDay: string) {
    const result: { t_group: number, t_userId: number, t_saving: number }[] = await this.transactionRepository.createQueryBuilder('t')
      .select('t.userId')
      .addSelect('t.group')
      .addSelect("SUM(t.amount)", "t_saving")
      .groupBy('t.userId')
      .addGroupBy('t.group')
      .where(`t.date BETWEEN "${startDay}" AND "${endDay}"`)
      .getRawMany()

    const groupbyGroup = result.reduce((prev, cur) => {
      if (prev[`${cur.t_group}`]) {
        prev[`${cur.t_group}`].push({ userid: cur.t_userId, amount: cur.t_saving })
      }
      else {
        prev[`${cur.t_group}`] = [{ userid: cur.t_userId, amount: cur.t_saving }]
      }
      return prev
    }, {})

    const a= Object.entries(groupbyGroup).map((e: any) => {
      return e[1].reduce((prev, cur) => {
        if (prev[`${cur.userid}`]) {
          prev[`${cur.userid}`] += cur.amount
        }
        else {
          prev[`${cur.userid}`] = cur.amount
        }
        return prev
      },{}
      )
    })
    console.log(a)
    return a

  }

  getUserExpanses(userId: number, month: number[]) {
    throw new Error('Method not implemented.');
  }


  addSaving(group: number, userId: number, description: string, amount: number) {
    this.transactionRepository.insert(
      {
        userId,
        group,
        description,
        amount,
        date: new Date(''),
      })
  }

}
