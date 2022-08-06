import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class BaseDeviceSettingItemDto {
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsOptional()
  @ApiPropertyOptional()
  readonly speed: number | null = null;

  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsOptional()
  @ApiPropertyOptional()
  readonly time: number | null = null;

  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsOptional()
  @ApiPropertyOptional()
  readonly weight: number | null = null;

  @IsInt()
  @Min(-273)  // Absolute zero: −273.15 C
  @Max(Number.MAX_SAFE_INTEGER)
  @IsOptional()
  @ApiPropertyOptional()
  readonly temperature: number | null = null;

  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsOptional()
  @ApiProperty()
  readonly order: number = 0;
}