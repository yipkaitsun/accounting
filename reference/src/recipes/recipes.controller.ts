import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  PreconditionFailedException,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '../common/decorators/user.decorator';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipeDto } from './dto/get-recipe-param.dto';
import { ListRecipeDto } from './dto/list-recipe-query.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipesControllerHandler } from './recipes.controller.handler';
import { RecipesService } from './recipes.service';

@ApiTags('Recipe')
@Controller('api/v3/auth/recipes')
export class RecipesController {
  constructor(
    private readonly recipesControllerHandler: RecipesControllerHandler,
    private readonly recipesService: RecipesService,
  ) { }

  @Post()
  async create(
    @User() user,
    @Body() createRecipeDto: CreateRecipeDto
  ) {
    const recipe = await this.recipesControllerHandler.buildRecipe(createRecipeDto, user);
    await this.recipesService.create(recipe);

    return {
      message: 'Recipe successfully created',
      obj: {
        recipe: await this.recipesControllerHandler.getRecipeDetail(recipe.id)
      }
    };
  }

  @Put(':id/draft')
  async updateDraft(
    @User() user,
    @Param() param: GetRecipeDto,
    @Body() createRecipeDto: CreateRecipeDto
  ) {
    const foundRecipe = await this.recipesControllerHandler.getRecipeDetail(param.id);
    if (!foundRecipe || foundRecipe.languageLocale !== createRecipeDto.languageLocale) {
      throw new PreconditionFailedException('Recipe language invalid');
    }
    const recipe = await this.recipesControllerHandler.buildRecipe(createRecipeDto, user);
    recipe.id = foundRecipe.id;
    await this.recipesService.create(recipe);

    return {
      message: 'Recipe successfully created',
      obj: {
        recipe: await this.recipesControllerHandler.getRecipeDetail(recipe.id)
      }
    };
  }

  @Get()
  async findAll(@Headers('accept-language') language: string, @Query() query: ListRecipeDto) {
    const { page, size, sortBy, filters, } = query;
    return {
      message: 'Recipes are successfully returned',
      obj: {
        recipes: await this.recipesControllerHandler.getRecipeList(page, size, language, sortBy, filters)
      }
    };
  }

  @Get(':id')
  async findOne(@Param() param: GetRecipeDto) {
    return {
      message: 'A recipe is returned',
      obj: {
        recipe: await this.recipesControllerHandler.getRecipeDetail(param.id)
      }
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return {
      message: this.recipesService.update(+id, updateRecipeDto),
      obj: {
        recipe: this.recipesService.update(+id, updateRecipeDto)
      }
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return {
      message: this.recipesService.remove(+id),
      obj: {
        recipe: this.recipesService.remove(+id)
      }
    };
  }
}
