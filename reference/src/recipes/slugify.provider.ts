import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import slugify from 'slugify';

@Injectable()
export class SlugifyProvider {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService
  ) { }

  slugify(slug: string): string {
    const maxLength: number = this.configService.get<number>('slugify.maxLength');
    const slugified = slugify(slug, this.configService.get('slugify'));
    if (maxLength > 0 && slugified.length > maxLength) {
      return slugified.substring(0, maxLength).replace(/-[^-]*$/, '');
    }
    return slugified;
  }
}
