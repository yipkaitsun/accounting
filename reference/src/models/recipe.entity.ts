
import {
  Column,
  Double,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RecipeDeviceType } from './recipe-device-type.entity';
import { RecipeImages } from './recipe-images.entity';
import { RecipeMeta } from './recipe-meta.entity';
import { RecipeNutrients } from './recipe-nutrients.entity';
import { RecipeCategory } from './recipe-recipe-category.entity';
import { RecipeReview } from './recipe-review.entity';
import { RecipeServingSize } from './recipe-serving-size.entity';
import { RecipeTranslation } from './recipe-translation.entity';
import { WpUser } from './wp_users.entity';
import { WpTerms } from './wp-terms.entity';

@Entity('recipe')
export class Recipe {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @Column({ type: 'tinyint', default: 0 })
  source: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'int', nullable: false })
  author_id: number;

  @Column({ type: 'int', nullable: true, default: null })
  complexity_id: number;

  @Column({ type: 'varchar', length: 7 })
  language_locale: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'datetime', nullable: true, default: null })
  first_published_at: Date;

  @Column({ type: 'datetime', nullable: true, default: null })
  last_published_at: Date;

  @Column({ type: 'datetime', nullable: true, default: null })
  deleted_at: Date;

  @Column({ type: 'int', nullable: true, default: null })
  parent_id: number;

  @Column({ type: 'tinyint', default: false })
  member_only: boolean;

  @Column({ type: 'float', nullable: true, default: null })
  popularity: number;

  @Column({ type: 'float', nullable: true, default: null })
  adming_rating: Double;

  @Column({ type: 'tinyint', default: false })
  has_video: boolean;

  @Column({ type: 'tinyint', default: false })
  is_media_archive_ready: boolean;

  @Column({ type: 'text', nullable: true, default: null })
  media_archive_url: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  media_archive_md5: string;

  @Column({ type: 'tinyint', default: false })
  allow_social_sharing: boolean;

  @OneToMany(
    () => RecipeDeviceType,
    (recipeHasMcDeviceTypeEntity) => recipeHasMcDeviceTypeEntity.recipe,
    { cascade: true }
  )
  deviceTypes: RecipeDeviceType[];

  @OneToMany(
    () => RecipeImages,
    (recipeImagesEntity) => recipeImagesEntity.recipe,
    { cascade: true }
  )
  recipeImages: RecipeImages[];

  @OneToMany(
    () => RecipeServingSize,
    (recipeHasMcDeviceTypeEntity) => recipeHasMcDeviceTypeEntity.recipe,
    { cascade: true }
  )
  servingSizes: RecipeServingSize[];

  @OneToMany(
    () => RecipeCategory,
    (recipeRecipeCategory) => recipeRecipeCategory.recipe,
    { cascade: true }
  )
  categories: RecipeCategory[];

  @OneToMany(
    () => RecipeNutrients,
    (recipeNutrients) => recipeNutrients.recipe,
    { cascade: true }
  )
  nutrients: RecipeNutrients[];

  @OneToMany(() => RecipeMeta, (recipeMeta) => recipeMeta.recipe)
  recipeMeta: RecipeMeta[];

  @OneToOne(
    () => RecipeTranslation,
    (recipeTranslation) => recipeTranslation.recipe,
    { cascade: true }
  )
  translation: RecipeTranslation;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipe)
  @JoinColumn({ name: 'parent_id' })
  recipe: Recipe;

  @OneToOne(() => WpTerms, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'complexity_id' })
  complexity: WpTerms;

  @OneToMany(
    () => RecipeReview,
    (recipeReview) => recipeReview.recipe,
  )
  review: RecipeReview[];
  @ManyToOne(
    () => WpUser,
    (wpUsers) => wpUsers.recipe,
    { createForeignKeyConstraints: false }
  )
  @JoinColumn({ name: 'author_id' })
  author: WpUser;
}
