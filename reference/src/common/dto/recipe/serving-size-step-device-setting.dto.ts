import { ApiProperty } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from 'class-validator';

import { BaseDeviceSettingItemDto } from './serving-size-step-device-setting-item.dto';

export class BaseDeviceSettingDto {
  @IsBoolean()
  @ApiProperty()
  readonly clockwise: boolean = true;

  @IsBoolean()
  @ApiProperty()
  readonly turbo: boolean = false;

  @IsString()
  @IsOptional()
  @Transform((orig) => {
    if (typeof orig.value === 'string') {
      return orig.value.length > 0 ? orig.value : null;
    }
    return orig.value;
  })
  @ApiProperty()
  readonly size: string | null = null;

  @IsString()
  @IsOptional()
  @Transform((orig) => {
    if (typeof orig.value === 'string') {
      return orig.value.length > 0 ? orig.value : null;
    }
    return orig.value;
  })
  @ApiProperty()
  readonly texture: string | null = null;

  @IsString()
  @IsOptional()
  @Transform((orig) => {
    if (typeof orig.value === 'string') {
      return orig.value.length > 0 ? orig.value : null;
    }
    return orig.value;
  })
  @ApiProperty()
  readonly cleaningMode: string | null = null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly mode: string;

  @IsArray()
  @IsNotEmptyObject({ nullable: false }, { each: true })
  @ValidateNested()
  @Type(() => BaseDeviceSettingItemDto)
  @IsOptional()
  @ApiProperty({
    type: BaseDeviceSettingItemDto,
    isArray: true
  })
  readonly settings: BaseDeviceSettingItemDto[] = [];
}