import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { ArrayMinSize, IsEnum, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from 'class-validator';

import { RecipeSource } from '../enums/recipe-source.enum';
import { RecipeStatus } from '../enums/recipe-status.enum';
import { BaseAuthorDto } from './recipe/author.dto';
import { BaseCategoryDto } from './recipe/category.dto';
import { BaseComplexityDto } from './recipe/complexity.dto';
import { BaseDeviceTypeDto } from './recipe/device-type.dto';
import { BaseImageDto } from './recipe/image.dto';/*
import { BaseNutrientDto } from './recipe/nutrient.dto';
import { BaseServingSizeDto } from './recipe/serving-size.dto'; */

export class BaseRecipeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  languageLocale: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseAuthorDto)
  @ApiProperty()
  author: BaseAuthorDto;

  @IsEnum(RecipeStatus)
  @IsString()
  @IsNotEmpty()
  @Transform((orig) => {
    if (typeof orig.value === 'string') {
      return RecipeStatus[orig.value.toUpperCase()];
    }
    return orig.value;
  })
  @ApiProperty()
  status: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsEnum(RecipeSource)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  source: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug: string;
  /*
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    description: string | null = null; */

  @ArrayMinSize(1)
  @IsNotEmptyObject({ nullable: false }, { each: true })
  @ValidateNested()
  @Type(() => BaseDeviceTypeDto)
  @ApiProperty({
    type: BaseDeviceTypeDto,
    isArray: true
  })
  deviceTypes: BaseDeviceTypeDto[] = [];

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseComplexityDto)
  @IsOptional()
  @ApiPropertyOptional({
    type: BaseComplexityDto
  })
  complexity: BaseComplexityDto;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseImageDto)
  @IsOptional()
  @ApiPropertyOptional()
  thumbnail?: BaseImageDto | null = null;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseImageDto)
  @IsOptional()
  @ApiPropertyOptional()
  detailsImage?: BaseImageDto | null = null;

  @ArrayMinSize(1)
  @IsNotEmptyObject({ nullable: false }, { each: true })
  @ValidateNested()
  @Type(() => BaseCategoryDto)
  @IsOptional()
  @ApiPropertyOptional({
    type: [BaseCategoryDto]
  })
  categories: BaseCategoryDto[] = [];

  /*   @ArrayMinSize(1)
    @IsNotEmptyObject({ nullable: false }, { each: true })
    @ValidateNested()
    @Type(() => BaseNutrientDto)
    @IsOptional()
    @ApiPropertyOptional({
      type: [BaseNutrientDto]
    })
    nutrients: BaseNutrientDto[] = []; */

  /*   @ArrayMinSize(1)
    @IsNotEmptyObject({ nullable: false }, { each: true })
    @ValidateNested()
    @Type(() => BaseServingSizeDto)
    @IsOptional()
    @ApiPropertyOptional({
      type: [BaseServingSizeDto]
    })
    servingSizes: BaseServingSizeDto[] = []; */

  translationId: number;
  publishedDate: string;
  createdDate: string;
  lastUpdated: string;
  preparationDuration: number;
  readyInTime: number;
  rating: number;
  totalRating: number;
  popularity: number;
  media: 'video' | null;
  copyrightWatermark: { url: string, isCopyRight: boolean };
  id: number;
  memberOnly: boolean;
  allowSocialSharing: boolean;

}