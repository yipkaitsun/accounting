import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  addSaving(@Body() body: { group: number, id: number, amount: number, description: string }) {
    const { group, id, description, amount } = body
    this.appService.addSaving(group, id, description, amount)
  }

/*   @Get()
  getUserExpanses(userId: number, month: number[]) {
    this.appService.getUserExpanses(userId, month)
  }
 */
  @Get()
  async getBalance(@Query() query: { startDay: string, endDay: string }) {
    return await this.appService.getUserBalanceByGroup(query.startDay,query.endDay)
  }


}
