import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

import { NutrientType } from '../../enums/nutrient-type.enum';

export class BaseNutrientDto {
  @IsEnum(NutrientType)
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @Transform((orig) => {
    if (typeof orig.value === 'string') {
      return NutrientType[orig.value.toUpperCase()];
    }
    return orig.value;
  })
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @ApiProperty()
  readonly unit: string;

  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  @ApiProperty()
  readonly amount: number;
}