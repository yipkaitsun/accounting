import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class CreateRecipeImageDto {
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsOptional()
  @ApiPropertyOptional()
  landscapeImageId: number;

  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsOptional()
  @ApiPropertyOptional()
  portraitImageId: number;
}