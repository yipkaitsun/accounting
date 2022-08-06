import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class BaseAuthorDto {
  @IsInt()
  @Min(1)
  @ApiProperty()
  id: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly avatar?: string;
}