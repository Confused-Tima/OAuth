import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadeToUserPhoneRelation1733469684582
  implements MigrationInterface
{
  name = 'AddCascadeToUserPhoneRelation1733469684582';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "phone" DROP CONSTRAINT "FK_260d7031e6bd9ed4fbcd2dd3ad6"`,
    );

    await queryRunner.query(
      `ALTER TABLE "phone" ADD CONSTRAINT "FK_phone_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "phone" DROP CONSTRAINT "FK_phone_user"`,
    );

    await queryRunner.query(
      `ALTER TABLE "phone" ADD CONSTRAINT "FK_260d7031e6bd9ed4fbcd2dd3ad6" FOREIGN KEY ("userId") REFERENCES "user"("id")`,
    );
  }
}
