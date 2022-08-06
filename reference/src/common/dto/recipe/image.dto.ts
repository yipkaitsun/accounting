import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BaseImageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly landscape: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly portrait?: string;
}