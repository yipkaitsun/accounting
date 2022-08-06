import { Inject, Injectable, PreconditionFailedException, UnprocessableEntityException } from '@nestjs/common';

import { unserialize } from 'php-serialize';
import { BaseRecipeDto } from 'src/common/dto/recipe.dto';
import { BaseAuthorDto } from 'src/common/dto/recipe/author.dto';
import { BaseCategoryDto } from 'src/common/dto/recipe/category.dto';
import { BaseComplexityDto } from 'src/common/dto/recipe/complexity.dto';
import { BaseDeviceTypeDto } from 'src/common/dto/recipe/device-type.dto';
import { BaseImageDto } from 'src/common/dto/recipe/image.dto';
import { BaseNutrientDto } from 'src/common/dto/recipe/nutrient.dto';
import { BaseServingSizeDto } from 'src/common/dto/recipe/serving-size.dto';
import { BaseServingSizeIngredientDto } from 'src/common/dto/recipe/serving-size-ingredient.dto';
import { BaseServingSizeIngredientGroupDto } from 'src/common/dto/recipe/serving-size-ingredient-group.dto';
import { BaseServingSizeStepDto } from 'src/common/dto/recipe/serving-size-step.dto';
import { BaseRecipeDetailDto } from 'src/common/dto/recipe-detail.dto';
import { RecipeSource } from 'src/common/enums/recipe-source.enum';
import { RecipeStatus } from 'src/common/enums/recipe-status.enum';
import { Recipe } from 'src/models/recipe.entity';
import { RecipeDeviceType } from 'src/models/recipe-device-type.entity';
import { RecipeImages } from 'src/models/recipe-images.entity';
import { RecipeIngredientGroup } from 'src/models/recipe-ingredient-group.entity';
import { RecipeIngredientGroupIngredient } from 'src/models/recipe-ingredient-group-ingredient.entity';
import { RecipeNutrients } from 'src/models/recipe-nutrients.entity';
import { RecipeCategory } from 'src/models/recipe-recipe-category.entity';
import { RecipeServingSize } from 'src/models/recipe-serving-size.entity';
import { RecipeServingSizeStep } from 'src/models/recipe-serving-size-step.entity';
import { RecipeServingSizeStepTranslation } from 'src/models/recipe-serving-size-step-translation.entity';
import { RecipeTranslation } from 'src/models/recipe-translation.entity';
import { RecipeTranslationId } from 'src/models/recipe-translation-id.entity';
import { TgiRecipeStepTranslationId } from 'src/models/tgi-recipe-step-translation-id.entity';
import { WpAs3cfItems } from 'src/models/wp-as3cf-items.entity';
import { WordpressService } from 'src/wordpress/wordpress.service';

import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FilterDto, SortByDto } from './dto/list-recipe-query.dto';
import { RecipeTranslationService } from './recipe-translation.service';
import { RecipesService } from './recipes.service';
import { SlugifyProvider } from './slugify.provider';

@Injectable()
export class RecipesControllerHandler {
  constructor(
    @Inject(SlugifyProvider) private readonly slugProvider: SlugifyProvider,
    @Inject(RecipesService) private readonly recipesService: RecipesService,
    @Inject(WordpressService) private readonly wordpressService: WordpressService,
    @Inject(RecipeTranslationService) private readonly recipeTranslationService: RecipeTranslationService,
  ) { }

  async buildRecipe(createRecipeDto: CreateRecipeDto, user): Promise<Recipe> {
    const language = await this.wordpressService.findActiveLanguagesByLocale(createRecipeDto.languageLocale);
    if (!language) {
      throw new UnprocessableEntityException('Invalid language');
    }
    const deviceTypes = await this.wordpressService.findDeviceTypesByIds(createRecipeDto.deviceTypeIds);
    if (deviceTypes.length !== createRecipeDto.deviceTypeIds.length) {
      throw new PreconditionFailedException('Invalid device type');
    }
    if (createRecipeDto.categoryIds.length > 0) {
      const recipeCategories = await this.wordpressService.findRecipeCategoriesByIds(createRecipeDto.categoryIds, language.locale);
      if (recipeCategories.length !== createRecipeDto.categoryIds.length) {
        throw new PreconditionFailedException('Invalid category');
      }
    }
    if (createRecipeDto.complexityId) {
      const recipeComplexity = await this.wordpressService.findRecipeComplexityById(createRecipeDto.complexityId, language.locale);
      if (!recipeComplexity) {
        throw new PreconditionFailedException('Invalid complexity');
      }
    }
    let parentRecipe: Recipe;
    if (createRecipeDto.parentId) {
      parentRecipe = await this.recipesService.getParentRecipe(createRecipeDto.parentId);
      if (!parentRecipe) {
        throw new PreconditionFailedException('Parent recipe not found');
      }
      const parentTranslations = await this.recipeTranslationService.findAllBy(parentRecipe.translation.id);
      for (const parentTranslation of parentTranslations) {
        if (parentTranslation.language_locale === createRecipeDto.languageLocale) {
          throw new PreconditionFailedException('Translation already exists');
        }
      }
    }

    // Map to Recipe entity
    const recipe = new Recipe();
    recipe.language_locale = createRecipeDto.languageLocale;
    recipe.status = RecipeStatus.DRAFT;
    recipe.title = createRecipeDto.title;
    recipe.source = RecipeSource[createRecipeDto.source];
    recipe.slug = await this.generateSlug(createRecipeDto.title);
    recipe.description = createRecipeDto.description;
    recipe.complexity_id = createRecipeDto.complexityId;
    recipe.parent_id = createRecipeDto.parentId;
    recipe.allow_social_sharing = createRecipeDto.allowSocialSharing;

    recipe.author_id = user.id;

    recipe.deviceTypes = [];
    for (const deviceTypeId of createRecipeDto.deviceTypeIds) {
      const deviceType = new RecipeDeviceType();
      deviceType.device_type_id = deviceTypeId;
      recipe.deviceTypes.push(deviceType);
    }

    recipe.categories = [];
    for (const categoryId of createRecipeDto.categoryIds) {
      const category = new RecipeCategory();
      category.recipe_category_id = categoryId.toString();
      recipe.categories.push(category);
    }

    recipe.nutrients = [];
    for (const nutrient of createRecipeDto.nutrients) {
      const recipeNutrient = new RecipeNutrients();
      recipeNutrient.name = nutrient.name;
      recipeNutrient.amount = nutrient.amount;
      recipeNutrient.unit = nutrient.unit;
      recipe.nutrients.push(recipeNutrient);
    }

    recipe.servingSizes = [];
    for (const servingSize of createRecipeDto.servingSizes) {
      const recipeServingSize = new RecipeServingSize();
      recipeServingSize.is_default = servingSize.isDefault;
      recipeServingSize.amount = servingSize.amount;
      recipeServingSize.serving_unit = servingSize.unit;
      recipeServingSize.instructions = servingSize.instructions;
      recipeServingSize.ready_in_time = servingSize.readyInTime;
      recipeServingSize.preparation_time = servingSize.preparationTime;

      recipeServingSize.recipeIngredientGroup = [];
      // Always create a default group
      const defaultIngredientGroup = new RecipeIngredientGroup();
      defaultIngredientGroup.name = '';
      defaultIngredientGroup.is_default = true;
      defaultIngredientGroup.order = 0;
      recipeServingSize.recipeIngredientGroup.push(defaultIngredientGroup);
      for (const servingSizeIngredientGroup of servingSize.ingredientGroups) {
        let ingredientGroup: RecipeIngredientGroup;
        if (servingSizeIngredientGroup.isDefault) {
          ingredientGroup = recipeServingSize.recipeIngredientGroup[0];
        } else {
          ingredientGroup = new RecipeIngredientGroup();
          ingredientGroup.is_default = servingSizeIngredientGroup.isDefault;
          ingredientGroup.order = recipeServingSize.recipeIngredientGroup.length;
        }
        ingredientGroup.name = servingSizeIngredientGroup.name;

        ingredientGroup.recipeIngredientGroupIngredients = [];
        for (const servingSizeIngredient of servingSizeIngredientGroup.ingredients) {
          const ingredient = new RecipeIngredientGroupIngredient();
          ingredient.name = servingSizeIngredient.name;
          ingredient.amount = servingSizeIngredient.amount;
          ingredient.unit = servingSizeIngredient.unit;
          ingredient.system_ingredient_id = servingSizeIngredient.systemIngredientId;
          ingredient.order = ingredientGroup.recipeIngredientGroupIngredients.length;
          ingredientGroup.recipeIngredientGroupIngredients.push(ingredient);
        }
        recipeServingSize.recipeIngredientGroup.push(ingredientGroup);
      }

      recipeServingSize.recipeServingSizeStep = [];
      for (const servingSizeStep of servingSize.steps) {
        const step = new RecipeServingSizeStep();
        const stepTranslation = new RecipeServingSizeStepTranslation();
        step.title = servingSizeStep.title;
        step.description = servingSizeStep.description;
        step.device_setting = servingSizeStep.deviceSetting ?? JSON.stringify(servingSizeStep.deviceSetting);
        step.order = recipeServingSize.recipeServingSizeStep.length;
        stepTranslation.tgiRecipeStepTranslationId = new TgiRecipeStepTranslationId();
        step.recipeServingSizeStepTranslation = stepTranslation;
        recipeServingSize.recipeServingSizeStep.push(step);
      }

      recipe.servingSizes.push(recipeServingSize);
    }

    const translation = new RecipeTranslation();
    translation.language_locale = recipe.language_locale;
    if (!recipe.parent_id) {
      translation.recipeTranslationId = new RecipeTranslationId();
    } else {
      // Load translation and add
      translation.recipe_translation_id = parentRecipe.translation.recipe_translation_id;
      translation.source_language_locale = parentRecipe.language_locale;
    }
    recipe.translation = translation;
    return recipe;
  }

  async generateSlug(title: string) {
    let slug = this.slugProvider.slugify(title);
    const countSameSlugRecipes = await this.recipesService.countAllLikeSlug(slug);
    if (countSameSlugRecipes > 0) {
      slug = `${slug}-${countSameSlugRecipes}`;
    }
    return slug;
  }

  filterClasue(filter: FilterDto) {
    const whereClause: string[] = [];
    if (filter?.category) {
      const categories = filter.category;
      const clause = categories.reduce((prev, cur, index) => {
        prev += `${cur}`;
        if (index !== categories.length - 1)
          prev += ', ';
        return prev;
      }, 'rc.recipe_category_id in (') + ')';
      whereClause.push(clause);
    } // :TODO

    if (filter?.complexity) {
      const clause = `complexity.name = "${filter.complexity}"`;
      whereClause.push(clause);
    }

    if (filter?.media) {
      const clause = 'r.has_video = 1';
      whereClause.push(clause);
    }

    if (filter?.rating) {
      const clause = `review.rating BETWEEN ${filter.rating.from} AND ${filter.rating.to}`;
      whereClause.push(clause);
    }

    if (filter?.source) {
      const source = filter.source;
      const clause = source.reduce((prev, cur, index) => {
        prev += `${RecipeSource[cur]}`;
        if (index !== source.length - 1)
          prev += ', ';
        return prev;
      }, 'r.source in (') + ')';
      whereClause.push(clause);
    }

    if (filter?.deviceType) {
      const deviceType = filter.deviceType;
      const clause = `dttm.meta_value = "${deviceType}"`;
      whereClause.push(clause);
    }

    if (filter?.duration) {
      const duration = filter.duration;
      const clause = `ss.ready_in_time BETWEEN ${duration.from} AND ${duration.to} AND ss.is_default = 1`;
      whereClause.push(clause);
    }

    if (filter?.ingredientCategory) {
      const ingredientCategory = filter.ingredientCategory;
      const clause = ingredientCategory.reduce((prev, cur, index) => {
        prev += `${cur}`;
        if (index !== ingredientCategory.length - 1)
          prev += ', ';
        return prev;
      }, 'wtt.term_id in (') + ')';
      whereClause.push(clause);
    }

    return whereClause.reduce((prev, cur, index) => {
      prev += `${cur}`;
      if (index !== whereClause.length - 1)
        prev += ' AND ';
      return prev;
    }
      , ''
    );
  }

  async getRecipeList(page: number, size: number, language: string, sortBy?: SortByDto[], filters?: FilterDto) {
    const offset = (page - 1) * size;
    const whereClause = this.filterClasue(filters);
    const recipes = await this.recipesService.getRecipeList(language, offset, size, whereClause);
    return Promise.all(recipes.map(recipe => this.convertToRecipeDto(recipe)));
  }

  async getRecipeDetail(id: number) {
    return this.recipesService.getRecipeDetail(id).then(recipe => {
      return this.convertToRecipeDetailDto(recipe);
    });
  }

  private convertToRecipeDetailDto = async (recipe: Recipe) => {
    const { allow_social_sharing, member_only, language_locale: languageLocale, status, title, slug, description, popularity, first_published_at, created_at, last_published_at, media_archive_url: mediaArchiveUrl,
      media_archive_md5: mediaArchiveMd5, has_video, id, review, source: recipeSource } = recipe;
    const translationId = recipe.translation?.id || null;
    const defaultServingSize = recipe.servingSizes.find(e => Boolean(e.is_default));
    const preparationDuration = defaultServingSize?.preparation_time || null;
    const readyInTime = defaultServingSize?.ready_in_time || null;
    const thumbnail: BaseImageDto = this.getImages(recipe.recipeImages, 'thumbnail');
    const detailsImage: BaseImageDto = this.getImages(recipe.recipeImages, 'detailImage');
    const servingSizes = await this.getServingSizes(recipe); // wpAs3cfItemsRepository sourceId data type not match with post meta_value, need to use another sql to get ingredient IconUrl
    const author: BaseAuthorDto = this.getAuthor(recipe);
    const deviceTypes: BaseDeviceTypeDto[] = recipe.deviceTypes.map(deviceType =>
    ({
      id: deviceType.device_type_id,
      name: deviceType.deviceTypeTerm?.name,
      code: deviceType.deviceTypeTerm?.termMeta.find(e => e?.meta_value)?.meta_value
    }));
    const nutrients: BaseNutrientDto[] = recipe.nutrients.map(e => ({ name: e.name, unit: e.unit, amount: e.amount }));
    const complexity: BaseComplexityDto = recipe.complexity_id ? {
      id: recipe.complexity_id,
      name: recipe.complexity.name,
      level: recipe.complexity.term_order
    } : null;
    const categories: BaseCategoryDto[] = recipe.categories.map(e => ({ id: e.wpTerms?.term_id, name: e.wpTerms?.name }));
    const publishedDate = this.getLocaleDateTime(first_published_at);
    const createdDate = this.getLocaleDateTime(created_at);
    const lastUpdated = this.getLocaleDateTime(last_published_at);
    const source = RecipeSource[recipeSource];
    const rating = review.length === 0 ? 0 : review.reduce((prev, cur) => prev + cur.rating, 0) / review.length;
    const media = Boolean(has_video) === true ? 'video' : null;
    const allowSocialSharing = Boolean(allow_social_sharing);
    const memberOnly = Boolean(member_only);
    const totalRating = review.length;
    const isCopyRight = recipe.categories.some(category =>
      category.wpTerms.termMeta?.some(termMeta => ((termMeta.meta_key === 'is_copyright') && (termMeta.meta_value === '1'))));
    const sourceId = isCopyRight ? recipe.categories.reduce((_prev, cur, _i, arr) => {
      const metaValue = cur.wpTerms.termMeta.find(termMeta => termMeta.meta_key === 'copyright_image')?.meta_value;
      if (metaValue) {
        arr.splice(1);
      }
      return metaValue;
    }, '') : null;
    const waterMarkUrl = this.getAs3cfItemPath(await this.recipesService.getWpAs3cfItemsBySourceId(sourceId));
    const copyrightWatermark = { url: waterMarkUrl, isCopyRight };
    const recipeDetail: BaseRecipeDetailDto = {
      id,
      languageLocale,
      author,
      status,
      title,
      source,
      slug,
      description,
      complexity,
      deviceTypes,
      thumbnail,
      detailsImage,
      categories,
      nutrients,
      servingSizes,
      // below add to dto ?
      translationId,
      publishedDate,
      createdDate,
      lastUpdated,
      preparationDuration,
      readyInTime,
      rating,
      totalRating,
      popularity,
      media,
      copyrightWatermark,
      mediaArchiveUrl,
      mediaArchiveMd5,
      memberOnly,
      allowSocialSharing
    };
    return recipeDetail;
  };

  private convertToRecipeDto = async (recipe: Recipe) => {
    const { allow_social_sharing, member_only, complexity: recipeComplexity, recipeImages, complexity_id, language_locale: languageLocale, status, title, source: recipeSource, first_published_at, created_at, last_published_at, servingSizes, review, popularity, has_video, id, slug } = recipe;
    const translationId = recipe.translation?.id || null;
    const deviceTypes: BaseDeviceTypeDto[] = recipe.deviceTypes.map(deviceType => ({
      id: deviceType.device_type_id,
      name: deviceType.deviceTypeTerm?.name || null,
      code: deviceType.deviceTypeTerm?.termMeta.find(e => e?.meta_value)?.meta_value || null
    }));
    const thumbnail = this.getImages(recipeImages, 'thumbnail');
    const author = this.getAuthor(recipe);
    const categories: BaseCategoryDto[] = recipe.categories.map(e => ({ id: e?.wpTerms.term_id, name: e?.wpTerms.name }));
    const defaultServingSize = servingSizes.find(e => e.is_default);
    const preparationDuration = defaultServingSize?.preparation_time || null;
    const readyInTime = defaultServingSize?.ready_in_time || null;
    const complexity: BaseComplexityDto = { id: complexity_id, name: recipeComplexity?.name || null, level: recipeComplexity?.term_order || null };
    const publishedDate = this.getLocaleDateTime(first_published_at);
    const createdDate = this.getLocaleDateTime(created_at);
    const lastUpdated = this.getLocaleDateTime(last_published_at);
    const source = RecipeSource[recipeSource];
    const rating = review.length === 0 ? 0 : review.reduce((prev, cur) => prev + cur.rating, 0) / review.length;
    const media = Boolean(has_video) === true ? 'video' : null;
    const allowSocialSharing = Boolean(allow_social_sharing);
    const memberOnly = Boolean(member_only);
    const totalRating = review.length;
    const isCopyRight = recipe.categories.some(category => category.wpTerms.termMeta?.some(termMeta => ((termMeta.meta_key === 'is_copyright') && (termMeta.meta_value === '1'))));
    const sourceId = isCopyRight ? recipe.categories.reduce((_prev, cur, _i, arr) => {
      const metaValue = cur.wpTerms.termMeta.find(termMeta => termMeta.meta_key === 'copyright_image')?.meta_value;
      if (metaValue) {
        arr.splice(1);
      }
      return metaValue;
    }, '') : null;
    const waterMarkUrl = this.getAs3cfItemPath(await this.recipesService.getWpAs3cfItemsBySourceId(sourceId));
    const copyrightWatermark = { url: waterMarkUrl, isCopyRight };
    const recipeDto: BaseRecipeDto = {
      languageLocale,
      author,
      status,
      title,
      source,
      deviceTypes,
      complexity,
      categories,
      translationId,
      publishedDate,
      createdDate,
      lastUpdated,
      preparationDuration,
      readyInTime,
      rating,
      totalRating,
      popularity,
      media,
      copyrightWatermark,
      id,
      slug,
      thumbnail,
      allowSocialSharing,
      memberOnly,
    };
    return recipeDto;
  };

  private getImages(recipeImages: RecipeImages[], type: string) {
    const landscapeAs3cfItems = recipeImages.find(e => e.orientation === 'landscape' && e.type === type)?.as3cfItems;
    const portraitAs3cfItems = recipeImages.find(e => e.orientation === 'portrait' && e.type === type)?.as3cfItems;
    const landscape = this.getAs3cfItemPath(landscapeAs3cfItems);
    const portrait = this.getAs3cfItemPath(portraitAs3cfItems);
    return { landscape, portrait };
  }

  private getAuthor = (recipe: Recipe) => {
    let authorAvatar: string | null;
    try {
      const metaValue = recipe.author.wpUsermeta.find(e => e.meta_key === 'wp_user_avatar')?.meta_value;
      if (metaValue) {
        const unserializeMetaValue = unserialize(metaValue);
        authorAvatar = Array.isArray(unserializeMetaValue) ?
          unserializeMetaValue[0]?.avatar_url || null
          : null;
      }
    }
    catch (e) { authorAvatar = null; } // if catching error when unserialize the meta_value , keep authorAvatar into null //
    const author: BaseAuthorDto = { id: parseInt(recipe.author?.id, 10), name: recipe.author?.display_name, avatar: authorAvatar };
    return author;
  };

  private getLocaleDateTime(date: Date) {
    return date ? `${date?.toLocaleDateString('sv-SE')} ${date?.toLocaleTimeString('sv-SE')}` : null;
  }

  private getAs3cfItemPath(wpAs3cfItems: WpAs3cfItems) {
    return wpAs3cfItems ? `https://${wpAs3cfItems.bucket}.googleapis.com/${wpAs3cfItems.path}` : null;
  }

  private getServingSizes = (recipe: Recipe) => {
    return Promise.all(recipe.servingSizes.map(async (recipeServingSize) => {
      return this.getIngredientGroups(recipeServingSize).then(ingredientGroups => {
        const steps = recipeServingSize.recipeServingSizeStep.map(recipeServingSizeStep => {
          const servingSizeStep: BaseServingSizeStepDto = {
            title: recipeServingSizeStep.title,
            description: recipeServingSizeStep.description,
            deviceSetting: recipeServingSizeStep.device_setting,
            id: recipeServingSize.id
          };
          return servingSizeStep;
        });
        const servingSize: BaseServingSizeDto = {
          amount: recipeServingSize.amount,
          instructions: recipeServingSize.instructions,
          unit: recipeServingSize.serving_unit,
          isDefault: Boolean(recipeServingSize.is_default),
          preparationTime: recipeServingSize.preparation_time,
          readyInTime: recipeServingSize.ready_in_time,
          ingredientGroups,
          steps
        };
        return servingSize;
      });
    }));
  };

  private getIngredientGroupIngredients = (recipeIngredientGroup: RecipeIngredientGroup) => {
    return Promise.all(recipeIngredientGroup.recipeIngredientGroupIngredients.map(async (recipeIngredientGroupIngredient) => {
      const sourceIds = recipeIngredientGroupIngredient.wpPosts?.wpTermRelationships.map(relationship => relationship?.wpTermTaxonomy?.wpTermMeta.find(e => e?.meta_value)?.meta_value) || [];
      const sourceId = sourceIds.filter(e => e)[0];
      return this.recipesService.getWpAs3cfItemsBySourceId(sourceId).then(wpAs3cfItems => {
        const iconUrl = this.getAs3cfItemPath(wpAs3cfItems);
        const ingredientName = Number(recipeIngredientGroupIngredient.system_ingredient_id) === -1
          ? recipeIngredientGroupIngredient.name
          : recipeIngredientGroupIngredient.wpPosts?.post_title || null;

        const ingredientGroupIngredients: BaseServingSizeIngredientDto = {
          name: ingredientName,
          unit: recipeIngredientGroupIngredient.unit,
          amount: recipeIngredientGroupIngredient.amount,
          systemIngredientId: recipeIngredientGroupIngredient.system_ingredient_id,
          // below add to dto?
          order: recipeIngredientGroupIngredient.order,
          ingredientGroupId: recipeIngredientGroupIngredient.recipe_ingredient_group_id,
          iconUrl
        };
        return ingredientGroupIngredients;
      });
    }));
  };

  private getIngredientGroups = (servingSize: RecipeServingSize) => {
    return Promise.all(servingSize.recipeIngredientGroup.map(async (ingredientGroup) => {
      return this.getIngredientGroupIngredients(ingredientGroup).then(ingredientGroupIngredients => {
        const ingredientGroups: BaseServingSizeIngredientGroupDto = {
          id: ingredientGroup.id,
          name: ingredientGroup.name,
          isDefault: Boolean(ingredientGroup.is_default),
          ingredients: ingredientGroupIngredients
        };
        return ingredientGroups;
      });
    }));
  };

}