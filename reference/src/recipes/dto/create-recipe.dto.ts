import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Exclude, Transform, Type } from 'class-transformer';
import { ArrayMinSize, ArrayUnique, IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, Max, MaxLength, Min, ValidateNested } from 'class-validator';
import { BaseNutrientDto } from 'src/common/dto/recipe/nutrient.dto';
import { BaseServingSizeDto } from 'src/common/dto/recipe/serving-size.dto';
import { RecipeSource } from 'src/common/enums/recipe-source.enum';

import { CreateRecipeImageDto } from './create-recipe-image.dto';


export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(7)
  @ApiProperty()
  languageLocale: string;

  @Exclude()
  status: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsEnum(RecipeSource)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Transform((orig) => {
    if (typeof orig.value === 'string') {
      return orig.value.toLowerCase();
    }
    return orig.value;
  })
  @ApiPropertyOptional()
  source: string;

  @Exclude()
  slug: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string = null;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateRecipeImageDto)
  @IsOptional()
  @ApiPropertyOptional({
    type: CreateRecipeImageDto
  })
  detailsImage: CreateRecipeImageDto = null;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateRecipeImageDto)
  @IsOptional()
  @ApiPropertyOptional({
    type: CreateRecipeImageDto
  })
  thumbnail: CreateRecipeImageDto = null;

  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsOptional()
  @ApiPropertyOptional()
  complexityId: number;

  @ArrayUnique()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(Number.MAX_SAFE_INTEGER, { each: true })
  @ApiProperty({
    type: Number,
    isArray: true,
  })
  deviceTypeIds: number[] = [];

  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(Number.MAX_SAFE_INTEGER, { each: true })
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
    isArray: true,
  })
  categoryIds: number[] = [];

  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsOptional()
  @ApiPropertyOptional()
  parentId: number | null = null;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  memberOnly = false;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  allowSocialSharing = false;

  @IsArray()
  @IsNotEmptyObject({ nullable: false }, { each: true })
  @ValidateNested()
  @Type(() => BaseNutrientDto)
  @IsOptional()
  @ApiPropertyOptional({
    type: BaseNutrientDto,
    isArray: true
  })
  nutrients: BaseNutrientDto[] = [];

  @IsArray()
  @IsNotEmptyObject({ nullable: false }, { each: true })
  @ValidateNested()
  @Type(() => BaseServingSizeDto)
  @IsOptional()
  @ApiPropertyOptional({
    type: BaseServingSizeDto,
    isArray: true
  })
  servingSizes: BaseServingSizeDto[] = [];
}