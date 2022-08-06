import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1658719619135 implements MigrationInterface {
    name = 'init1658719619135';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `recipe_device_type` (`device_type_id` int NOT NULL, `recipe_id` int NOT NULL, PRIMARY KEY (`device_type_id`, `recipe_id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `recipe_meta` (`id` int NOT NULL AUTO_INCREMENT, `recipe_id` int NOT NULL, `meta_key` varchar(255) NOT NULL, `meta_value` varchar(45) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `recipe_nutrients` (`id` int NOT NULL AUTO_INCREMENT, `recipe_id` int NOT NULL, `name` varchar(45) NOT NULL, `amount` int NOT NULL DEFAULT \'0\', `unit` varchar(45) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `recipe_recipe_category` (`recipe_id` int NOT NULL, `recipe_category_id` int NOT NULL, PRIMARY KEY (`recipe_id`, `recipe_category_id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `recipe_ingredient_group_ingredient` (`id` int NOT NULL AUTO_INCREMENT, `recipe_ingredient_group_id` int NOT NULL, `name` varchar(255) NULL, `amount` varchar(45) NULL, `unit` varchar(45) NULL, `system_ingredient_id` int NULL, `order` tinyint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `recipe_ingredient_group` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `order` int NOT NULL DEFAULT \'0\', `recipe_serving_size_id` int NOT NULL, `is_default` tinyint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `recipe_serving_size_step_translation` (`recipe_serving_size_step_id` int NOT NULL, `translation_id` int NOT NULL, UNIQUE INDEX `REL_12b4a59bd19e9f6fe8fd0f477e` (`recipe_serving_size_step_id`), PRIMARY KEY (`recipe_serving_size_step_id`, `translation_id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `recipe_serving_size_step` (`id` int NOT NULL AUTO_INCREMENT, `recipe_serving_size_id` int NOT NULL, `title` varchar(255) NOT NULL, `description` text NULL, `order` tinyint NOT NULL, `device_setting` json NULL, `video_mp4_file_url` text NULL, `video_his_file_url` text NULL, `video_dash_file_url` text NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `recipe_serving_size` (`id` int NOT NULL AUTO_INCREMENT, `recipe_id` int NOT NULL, `is_default` tinyint NOT NULL DEFAULT 0, `amount` int NOT NULL, `serving_unit` varchar(45) NOT NULL, `instructions` text NULL, `ready_in_time` int NOT NULL, `preparation_time` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `recipe_translation_id` (`id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `recipe_translation` (`id` int NOT NULL AUTO_INCREMENT, `recipe_translation_id` int NOT NULL, `recipe_id` int NOT NULL, `language_locale` varchar(7) NOT NULL, `source_language_locale` varchar(7) NULL, INDEX `IDX_c46a3b25c496524ca0fa9bd0a5` (`language_locale`), UNIQUE INDEX `IDX_62d04caa1d95700c00ecfbbb8a` (`recipe_translation_id`, `language_locale`), INDEX `IDX_8fd25ecbd8e0678401063de4ae` (`recipe_id`, `language_locale`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `recipe` (`id` int NOT NULL AUTO_INCREMENT, `title` text NOT NULL, `description` text NULL, `status` varchar(20) NOT NULL, `source` tinyint NOT NULL DEFAULT \'0\', `slug` varchar(255) NOT NULL, `author_id` bigint NOT NULL, `complexity_id` int NULL, `language_locale` varchar(7) NOT NULL, `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `first_published_at` datetime NULL, `last_published_at` datetime NULL, `deleted_at` datetime NULL, `parent_id` int NULL, `member_only` tinyint NOT NULL DEFAULT 0, `popularity` float NULL, `adming_rating` float NULL, `has_video` tinyint NOT NULL DEFAULT 0, `is_media_archive_ready` tinyint NOT NULL DEFAULT 0, `media_archive_url` text NULL, `media_archive_md5` varchar(100) NULL, `allow_social_sharing` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_a0484b1faa35e0741ec6467e3f` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `recipe_images` (`recipe_id` int NOT NULL, `image_id` bigint NOT NULL, `type` varchar(45) NOT NULL, `orientation` varchar(45) NULL, PRIMARY KEY (`recipe_id`, `image_id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `recipe_device_type` ADD CONSTRAINT `FK_e2f9c858eadc1d3a952cb39d588` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `recipe_meta` ADD CONSTRAINT `FK_44dfa0733344212a577bf8654b2` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `recipe_nutrients` ADD CONSTRAINT `FK_a30be9a35304167b7ab4a2e2d15` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `recipe_recipe_category` ADD CONSTRAINT `FK_c043c95ebb537fb4938cf4d4e72` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `recipe_ingredient_group_ingredient` ADD CONSTRAINT `FK_0ea065d014075883235e995f8c3` FOREIGN KEY (`recipe_ingredient_group_id`) REFERENCES `recipe_ingredient_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `recipe_ingredient_group` ADD CONSTRAINT `FK_e3b293c6ad6448b85ceb8787e8b` FOREIGN KEY (`recipe_serving_size_id`) REFERENCES `recipe_serving_size`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `recipe_serving_size_step_translation` ADD CONSTRAINT `FK_12b4a59bd19e9f6fe8fd0f477e7` FOREIGN KEY (`recipe_serving_size_step_id`) REFERENCES `recipe_serving_size_step`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `recipe_serving_size_step` ADD CONSTRAINT `FK_2d604d55d631d63a0b87d8a5805` FOREIGN KEY (`recipe_serving_size_id`) REFERENCES `recipe_serving_size`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `recipe_serving_size` ADD CONSTRAINT `FK_5d1d9633d200295c6bce952d7e4` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `recipe_translation` ADD CONSTRAINT `FK_9e22e87c55361f54d5c4922c45a` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `recipe_translation` ADD CONSTRAINT `FK_a8ef7546077403a6517da0c16bb` FOREIGN KEY (`recipe_translation_id`) REFERENCES `recipe_translation_id`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `recipe` ADD CONSTRAINT `FK_faaadad1d219328a4ad40883ac4` FOREIGN KEY (`parent_id`) REFERENCES `recipe`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `recipe_images` ADD CONSTRAINT `FK_cfc8963f1892283eaa9faace456` FOREIGN KEY (`image_id`) REFERENCES `wp_as3cf_items`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `recipe_images` DROP FOREIGN KEY `FK_cfc8963f1892283eaa9faace456`');
        await queryRunner.query('ALTER TABLE `recipe` DROP FOREIGN KEY `FK_faaadad1d219328a4ad40883ac4`');
        await queryRunner.query('ALTER TABLE `recipe_translation` DROP FOREIGN KEY `FK_a8ef7546077403a6517da0c16bb`');
        await queryRunner.query('ALTER TABLE `recipe_translation` DROP FOREIGN KEY `FK_9e22e87c55361f54d5c4922c45a`');
        await queryRunner.query('ALTER TABLE `recipe_serving_size` DROP FOREIGN KEY `FK_5d1d9633d200295c6bce952d7e4`');
        await queryRunner.query('ALTER TABLE `recipe_serving_size_step` DROP FOREIGN KEY `FK_2d604d55d631d63a0b87d8a5805`');
        await queryRunner.query('ALTER TABLE `recipe_serving_size_step_translation` DROP FOREIGN KEY `FK_12b4a59bd19e9f6fe8fd0f477e7`');
        await queryRunner.query('ALTER TABLE `recipe_ingredient_group` DROP FOREIGN KEY `FK_e3b293c6ad6448b85ceb8787e8b`');
        await queryRunner.query('ALTER TABLE `recipe_ingredient_group_ingredient` DROP FOREIGN KEY `FK_0ea065d014075883235e995f8c3`');
        await queryRunner.query('ALTER TABLE `recipe_recipe_category` DROP FOREIGN KEY `FK_c043c95ebb537fb4938cf4d4e72`');
        await queryRunner.query('ALTER TABLE `recipe_nutrients` DROP FOREIGN KEY `FK_a30be9a35304167b7ab4a2e2d15`');
        await queryRunner.query('ALTER TABLE `recipe_meta` DROP FOREIGN KEY `FK_44dfa0733344212a577bf8654b2`');
        await queryRunner.query('ALTER TABLE `recipe_device_type` DROP FOREIGN KEY `FK_e2f9c858eadc1d3a952cb39d588`');
        await queryRunner.query('DROP TABLE `recipe_images`');
        await queryRunner.query('DROP INDEX `IDX_a0484b1faa35e0741ec6467e3f` ON `recipe`');
        await queryRunner.query('DROP TABLE `recipe`');
        await queryRunner.query('DROP INDEX `IDX_8fd25ecbd8e0678401063de4ae` ON `recipe_translation`');
        await queryRunner.query('DROP INDEX `IDX_62d04caa1d95700c00ecfbbb8a` ON `recipe_translation`');
        await queryRunner.query('DROP INDEX `IDX_c46a3b25c496524ca0fa9bd0a5` ON `recipe_translation`');
        await queryRunner.query('DROP TABLE `recipe_translation`');
        await queryRunner.query('DROP TABLE `recipe_translation_id`');
        await queryRunner.query('DROP TABLE `recipe_serving_size`');
        await queryRunner.query('DROP TABLE `recipe_serving_size_step`');
        await queryRunner.query('DROP INDEX `REL_12b4a59bd19e9f6fe8fd0f477e` ON `recipe_serving_size_step_translation`');
        await queryRunner.query('DROP TABLE `recipe_serving_size_step_translation`');
        await queryRunner.query('DROP TABLE `recipe_ingredient_group`');
        await queryRunner.query('DROP TABLE `recipe_ingredient_group_ingredient`');
        await queryRunner.query('DROP TABLE `recipe_recipe_category`');
        await queryRunner.query('DROP TABLE `recipe_nutrients`');
        await queryRunner.query('DROP TABLE `recipe_meta`');
        await queryRunner.query('DROP TABLE `recipe_device_type`');
    }

}
