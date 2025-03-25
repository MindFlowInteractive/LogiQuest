import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddOptionsAndCorrectAnswerToStepXXXX implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("step", new TableColumn({
            name: "options",
            type: "text",
            isNullable: true,
            isArray: true,
        }));

        await queryRunner.addColumn("step", new TableColumn({
            name: "correctAnswer",
            type: "text",
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("step", "options");
        await queryRunner.dropColumn("step", "correctAnswer");
    }
}
