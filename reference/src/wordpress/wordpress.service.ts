import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';

import { EntityManager } from 'typeorm';

import { DeviceType } from './interfaces/device-type.interface';
import { Language } from './interfaces/language.interface';
import { RecipeCategory } from './interfaces/recipe-category.interface';
import { RecipeComplexity } from './interfaces/recipe-complexity.interface';

@Injectable()
export class WordpressService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager
  ) { }

  findAllActiveLanguages(): Promise<Language[]> {
    return this.entityManager.createQueryBuilder()
      .select(['wilm.code AS code', 'wilm.locale AS locale'])
      .from('wp_icl_languages', 'wil')
      .innerJoin('wp_icl_locale_map', 'wilm', 'wil.code  = wilm.code')
      .where('wil.active = 1')
      .getRawMany<Language>();
  }

  findActiveLanguagesByLocale(locale: string): Promise<Language> {
    return this.entityManager.createQueryBuilder()
      .select(['wilm.code AS code', 'REPLACE(wilm.locale, "_", "-") AS locale'])
      .from('wp_icl_languages', 'wil')
      .innerJoin('wp_icl_locale_map', 'wilm', 'wil.code  = wilm.code')
      .where('wil.active = 1')
      .andWhere('wilm.locale = :locale', { locale: locale.replace('-', '_') })
      .getRawOne<Language>();
  }

  findDeviceTypesByIds(ids: number[]): Promise<DeviceType[]> {
    return this.entityManager.createQueryBuilder()
      .select(['wt.term_id AS id', 'wt.name AS name', 'wt.slug AS type', 'wtm.meta_value AS code'])
      .from('wp_terms', 'wt')
      .innerJoin('wp_term_taxonomy', 'wtt', 'wtt.term_id = wt.term_id AND wtt.taxonomy = "device_type"')
      .innerJoin('wp_termmeta', 'wtm', 'wtm.term_id = wt.term_id AND wtm.meta_key = "device_type_code"')
      .where('wt.term_id IN (:...ids)', { ids })
      .getRawMany<DeviceType>();
  }

  findRecipeCategoriesByIds(ids: number[], locale: string): Promise<RecipeCategory[]> {
    return this.entityManager.createQueryBuilder()
      .select(['wt.term_id AS id', 'wt.name AS name', 'REPLACE(wilm.locale, "_", "-") AS locale'])
      .from('wp_terms', 'wt')
      .innerJoin('wp_term_taxonomy', 'wtt', 'wtt.term_id = wt.term_id AND wtt.taxonomy = "category"')
      .innerJoin('wp_icl_translations', 'wit', 'wit.element_id = wtt.term_id AND wit.element_type = "tax_category"')
      .innerJoin('wp_icl_locale_map', 'wilm', 'wilm.code = wit.language_code')
      .where('wt.term_id IN (:...ids)', { ids })
      .andWhere('wilm.locale = :locale', { locale: locale.replace('-', '_') })
      .getRawMany<RecipeCategory>();
  }

  findRecipeComplexityById(id: number, locale: string): Promise<RecipeComplexity> {
    return this.entityManager.createQueryBuilder()
      .select(['wt.term_id AS id', 'wt.name AS name', 'REPLACE(wilm.locale, "_", "-") AS locale'])
      .from('wp_terms', 'wt')
      .innerJoin('wp_term_taxonomy', 'wtt', 'wtt.term_id = wt.term_id AND wtt.taxonomy = "complexity"')
      .innerJoin('wp_icl_translations', 'wit', 'wit.element_id = wtt.term_id AND wit.element_type = "tax_complexity"')
      .innerJoin('wp_icl_locale_map', 'wilm', 'wilm.code = wit.language_code')
      .where('wt.term_id IN (:id)', { id })
      .andWhere('wilm.locale = :locale', { locale: locale.replace('-', '_') })
      .getRawOne<RecipeComplexity>();
  }
}