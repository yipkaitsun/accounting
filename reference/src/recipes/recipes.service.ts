import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { WpAs3cfItems } from 'src/models/wp-as3cf-items.entity';
import { Like, Repository } from 'typeorm';

import { Recipe } from '../models/recipe.entity';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(WpAs3cfItems)
    private wpAs3cfItemsRepository: Repository<WpAs3cfItems>,

  ) { }

  create(recipe: Recipe) {
    return this.recipeRepository.save(recipe);
  }

  countAllLikeSlug(slug: string) {
    return this.recipeRepository
      .count({
        where: {
          slug: Like(`${slug}%`)
        }
      });
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {

    return `${updateRecipeDto} This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }

  getParentRecipe(id: number) {
    return this.recipeRepository.createQueryBuilder('recipe')
      .innerJoinAndSelect('recipe.translation', 'rt')
      .where('recipe.id = :id', { id })
      .getOne();
  }

  async getWpAs3cfItemsBySourceId(sourceId: string) {
    if (sourceId) {
      return await this.wpAs3cfItemsRepository.findOneBy({ source_id: parseInt(sourceId, 10) });
    }
    return null;
  }

  async getRecipeList(language: string, offset: number, size: number, filter?: string) {
    /* istanbul ignore next */
    const partialQuery = this.recipeRepository.createQueryBuilder('r')
      .leftJoinAndMapMany('r.recipeImages', 'r.recipeImages', 'i', 'i.type = :type').setParameter('type', 'thumbnail')
      .leftJoinAndMapOne('r.complexity', 'r.complexity', 'complexity')
      .leftJoinAndMapOne('i.as3cfItems', 'i.as3cfItems', 'as3cfItems')
      .leftJoinAndMapOne('r.translation', 'r.translation', 't')
      .leftJoinAndMapMany('r.deviceTypes', 'r.deviceTypes', 'dt')
      .leftJoinAndMapOne('dt.deviceTypeTerm', 'dt.deviceTypeTerm', 'dtt')
      .leftJoinAndMapMany('dtt.termMeta', 'dtt.termMeta', 'dttm', 'dttm.meta_key= :metakey').setParameter('metakey', 'device_type_code')
      .innerJoinAndMapOne('r.author', 'r.author', 'a')
      .leftJoinAndMapMany('r.categories', 'r.categories', 'rc')
      .leftJoinAndMapOne('rc.wpTerms', 'rc.wpTerms', 'cwt')
      .leftJoinAndMapMany('r.servingSizes', 'r.servingSizes', 'ss')
      .leftJoinAndMapMany('ss.recipeIngredientGroup', 'ss.recipeIngredientGroup', 'rig')
      .leftJoinAndMapMany('rig.recipeIngredientGroupIngredients', 'rig.recipeIngredientGroupIngredients', 'rigi')
      .leftJoinAndMapOne('rigi.wpPosts', 'rigi.wpPosts', 'wp')
      .leftJoinAndMapMany('wp.wpTermRelationships', 'wp.wpTermRelationships', 'wtr')
      .leftJoinAndMapOne('wtr.wpTermTaxonomy', 'wtr.wpTermTaxonomy', 'wtt', 'wtt.taxonomy = :taxonomy').setParameter('taxonomy', 'ingredient_category')
      .leftJoinAndMapOne('a.wpUsermeta', 'a.wpUsermeta', 'um')
      .leftJoinAndMapMany('r.review', 'r.review', 'review')
      .leftJoinAndMapMany('a.wpUsermeta', 'a.wpUsermeta', 'am', 'am.meta_key= :metaKey').setParameter('metaKey', 'wp_user_avatar')
      .where('r.language_locale = :locale').setParameter('locale', language).skip(offset).take(size);

    if (filter) {
      const a = await partialQuery.andWhere(filter).getMany();
      console.log(a);
    }
    return await partialQuery.getMany();
  }

  async getRecipeDetail(id: number) {
    /* istanbul ignore next */
    return await this.recipeRepository.createQueryBuilder('r')
      .leftJoinAndMapMany('r.recipeImages', 'r.recipeImages', 'i', 'i.type = :type or i.type = :type2').setParameters({ 'type': 'thumbnail', 'type2': 'detailsImage' })
      .leftJoinAndMapOne('r.complexity', 'r.complexity', 'complexity')
      .leftJoinAndMapOne('i.as3cfItems', 'i.as3cfItems', 'as3cfItems')
      .leftJoinAndMapOne('r.translation', 'r.translation', 'rt')
      .leftJoinAndMapMany('r.deviceTypes', 'r.deviceTypes', 'dt')
      .leftJoinAndMapOne('dt.deviceTypeTerm', 'dt.deviceTypeTerm', 'dtt')
      .leftJoinAndMapMany('dtt.termMeta', 'dtt.termMeta', 'dttm', 'dttm.meta_key= :metakey').setParameter('metakey', 'device_type_code')
      .innerJoinAndMapOne('r.author', 'r.author', 'a')
      .leftJoinAndMapMany('r.categories', 'r.categories', 'rc')
      .leftJoinAndMapOne('rc.wpTerms', 'rc.wpTerms', 'cwt')
      .leftJoinAndMapMany('r.nutrients', 'r.nutrients', 'rn')
      .leftJoinAndMapMany('r.servingSizes', 'r.servingSizes', 'ss')
      .leftJoinAndMapMany('ss.recipeServingSizeStep', 'ss.recipeServingSizeStep', 'rsss')
      .leftJoinAndMapMany('rsss.recipeServingSizeStepTranslation', 'rsss.recipeServingSizeStepTranslation', 'rssst')
      .leftJoinAndMapMany('ss.recipeIngredientGroup', 'ss.recipeIngredientGroup', 'rig')
      .leftJoinAndMapMany('rig.recipeIngredientGroupIngredients', 'rig.recipeIngredientGroupIngredients', 'rigi')
      .leftJoinAndMapMany('a.wpUsermeta', 'a.wpUsermeta', 'am', 'am.meta_key= :metaKey').setParameter('metaKey', 'wp_user_avatar')
      .leftJoinAndMapOne('rigi.wpPosts', 'rigi.wpPosts', 'wp')
      .leftJoinAndMapMany('wp.wpTermRelationships', 'wp.wpTermRelationships', 'wtr')
      .leftJoinAndMapOne('wtr.wpTermTaxonomy', 'wtr.wpTermTaxonomy', 'wtt', 'wtt.taxonomy = :taxonomy').setParameter('taxonomy', 'ingredient_category')
      .leftJoinAndMapMany('wtt.wpTermMeta', 'wtt.wpTermMeta', 'wtm', 'wtm.meta_key= "icon_press"')
      .leftJoinAndMapMany('r.review', 'r.review', 'review')
      .whereInIds(id)
      .getOne();
  }


}
