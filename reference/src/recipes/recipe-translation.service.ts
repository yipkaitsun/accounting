import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { RecipeTranslation } from '../models/recipe-translation.entity';

@Injectable()
export class RecipeTranslationService {
  constructor(
    @InjectRepository(RecipeTranslation)
    private recipeTranslationRepository: Repository<RecipeTranslation>,
  ) { }

  findAllBy(id: number) {
    return this.recipeTranslationRepository
      .find({
        where: {
          recipe_translation_id: id
        }
      });
  }
}