import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, Max, MaxLength, Min, ValidateNested } from 'class-validator';

import { BaseDeviceSettingDto } from './serving-size-step-device-setting.dto';

export class BaseServingSizeStepDto {
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsOptional()
  @ApiProperty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  readonly title: string;

  @IsString()
  @IsOptional()
  @Transform((orig) => {
    if (typeof orig.value === 'string') {
      return orig.value.length > 0 ? orig.value : null;
    }
    return orig.value;
  })
  @ApiPropertyOptional()
  readonly description: string | null = null;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseDeviceSettingDto)
  @IsOptional()
  @ApiPropertyOptional({
    type: 'BaseDeviceSettingDto'
  })
  readonly deviceSetting: BaseDeviceSettingDto | null = null;
}