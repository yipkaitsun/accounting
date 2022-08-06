import { ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { ArrayMinSize, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from 'class-validator';

import { BaseRecipeDto } from './recipe.dto';
import { BaseImageDto } from './recipe/image.dto';
import { BaseNutrientDto } from './recipe/nutrient.dto';
import { BaseServingSizeDto } from './recipe/serving-size.dto';

export class BaseRecipeDetailDto extends BaseRecipeDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string | null = null;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseImageDto)
  @IsOptional()
  @ApiPropertyOptional()
  detailsImage?: BaseImageDto | null = null;

  @ArrayMinSize(1)
  @IsNotEmptyObject({ nullable: false }, { each: true })
  @ValidateNested()
  @Type(() => BaseNutrientDto)
  @IsOptional()
  @ApiPropertyOptional({
    type: [BaseNutrientDto]
  })
  nutrients: BaseNutrientDto[] = [];

  @ArrayMinSize(1)
  @IsNotEmptyObject({ nullable: false }, { each: true })
  @ValidateNested()
  @Type(() => BaseServingSizeDto)
  @IsOptional()
  @ApiPropertyOptional({
    type: [BaseServingSizeDto]
  })
  servingSizes: BaseServingSizeDto[] = [];

  mediaArchiveUrl: string;
  mediaArchiveMd5: string;
}