import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { ArrayMinSize, IsBoolean, IsInt, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, Max, MaxLength, Min, ValidateNested } from 'class-validator';

import { BaseServingSizeIngredientDto } from './serving-size-ingredient.dto';

export class BaseServingSizeIngredientGroupDto {
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsOptional()
  @ApiProperty()
  readonly id: number;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly isDefault: boolean;

  @ArrayMinSize(1)
  @IsNotEmptyObject({ nullable: false }, { each: true })
  @ValidateNested()
  @Type(() => BaseServingSizeIngredientDto)
  @ApiProperty({
    type: BaseServingSizeIngredientDto,
    isArray: true,
  })
  ingredients: BaseServingSizeIngredientDto[] = [];
}