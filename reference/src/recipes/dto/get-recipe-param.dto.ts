import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetRecipeDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  @Transform((param) => {
    const id: string = param.value;
    return Number(id);
  })
  id: number;
}