import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, Max, MaxLength, Min, ValidateNested } from 'class-validator';

import { BaseServingSizeIngredientGroupDto } from './serving-size-ingredient-group.dto';
import { BaseServingSizeStepDto } from './serving-size-step.dto';

export class BaseServingSizeDto {
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @ApiProperty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @ApiProperty()
  readonly unit: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly isDefault: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly instructions?: string;

  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  @ApiProperty()
  preparationTime: number;

  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  @ApiProperty()
  readyInTime: number;

  @IsArray()
  @IsNotEmptyObject({ nullable: false }, { each: true })
  @ValidateNested()
  @Type(() => BaseServingSizeIngredientGroupDto)
  @ApiProperty({
    type: BaseServingSizeIngredientGroupDto,
    isArray: true
  })
  ingredientGroups: BaseServingSizeIngredientGroupDto[] = [];

  // MC1.1 does not support steps
  @IsArray()
  @IsNotEmptyObject({ nullable: false }, { each: true })
  @ValidateNested()
  @Type(() => BaseServingSizeStepDto)
  @ApiProperty({
    type: BaseServingSizeStepDto,
    isArray: true
  })
  steps: BaseServingSizeStepDto[] = [];
}