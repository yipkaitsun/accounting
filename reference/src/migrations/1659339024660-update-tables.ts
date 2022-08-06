import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTables1659339024660 implements MigrationInterface {
    name = 'updateTables1659339024660';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `recipe_images` DROP FOREIGN KEY `FK_cfc8963f1892283eaa9faace456`');
        await queryRunner.query('DROP INDEX `FK_cfc8963f1892283eaa9faace456` ON `recipe_images`');
        await queryRunner.query('CREATE TABLE `recipe_review` (`id` int NOT NULL AUTO_INCREMENT, `recipe_id` int NOT NULL, `user_id` int NOT NULL, `rating` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `recipe_images` ADD CONSTRAINT `FK_dd3bd710d8fd09a9cb234fcd8e5` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `recipe_review` ADD CONSTRAINT `FK_a4f163dc5187650f455e1c625cb` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `recipe_review` DROP FOREIGN KEY `FK_a4f163dc5187650f455e1c625cb`');
        await queryRunner.query('ALTER TABLE `recipe_images` DROP FOREIGN KEY `FK_dd3bd710d8fd09a9cb234fcd8e5`');
        await queryRunner.query('DROP TABLE `recipe_review`');
        await queryRunner.query('CREATE INDEX `FK_cfc8963f1892283eaa9faace456` ON `recipe_images` (`image_id`)');
    }

}
