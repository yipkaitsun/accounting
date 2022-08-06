import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class BaseCategoryDto {
  @IsInt()
  @Min(1)
  @ApiProperty()
  readonly id: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly name?: string;
}