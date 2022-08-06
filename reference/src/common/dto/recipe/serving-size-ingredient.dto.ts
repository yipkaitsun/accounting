import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsInt, IsNotIn, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class BaseServingSizeIngredientDto {
  @IsString()
  @MaxLength(255)
  @IsOptional()
  @Transform((orig) => {
    if (typeof orig.value === 'string') {
      return orig.value.length > 0 ? orig.value : null;
    }
    return orig.value;
  })
  @ApiPropertyOptional()
  readonly name: string | null = null;

  @IsString()
  @MaxLength(45)
  @ApiProperty()
  readonly unit: string;

  @IsString()
  @MaxLength(45)
  @ApiProperty()
  readonly amount: string;

  @IsInt()
  @Min(-1)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsNotIn([0])
  @ApiProperty()
  readonly systemIngredientId: number;

  order: number;
  ingredientGroupId: number;
  iconUrl: string;
}