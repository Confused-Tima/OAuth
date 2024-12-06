import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveNotNullLnameConstraintInUser1733412246860
  implements MigrationInterface
{
  name = 'RemoveNotNullLnameConstraintInUser1733412246860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lname" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lname" SET NOT NULL`,
    );
  }
}
