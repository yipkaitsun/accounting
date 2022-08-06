import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class BaseComplexityDto {
  @IsInt()
  @Min(1)
  @ApiProperty()
  id: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly name?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional()
  readonly level?: number;
}