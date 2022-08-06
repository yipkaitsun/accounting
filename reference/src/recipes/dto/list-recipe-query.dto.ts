import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class ListRecipeDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  @Min(1)
  @Transform((param) => {
    const page: string = param.value;
    return Number(page);
  })
  page: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  @Min(1)
  @Transform((param) => {
    const size: string = param.value;
    return Number(size);
  })
  size: number;
  filters?: FilterDto;
  sortBy?: SortByDto[];
}

export class SortByDto { field: string; direction: 'DESC' | 'ASC'; }

export class FilterDto {
  category?: string[];
  ingredientCategory?: number[];
  duration?: {
    from: string,
    to: string
  };
  complexity?: string;
  deviceType?: string;
  source?: string[];
  media?: 'video' | null;
  rating?: {
    from: string,
    to: string
  };

}