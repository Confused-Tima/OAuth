import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserGroupPermissionCountryPhoneDialingcodeTables1731756326606
  implements MigrationInterface
{
  name = 'AddUserGroupPermissionCountryPhoneDialingcodeTables1731756326606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "group" ("id" SERIAL NOT NULL, "group" character varying(100) NOT NULL, CONSTRAINT "UQ_58b8339f1dc66a375fbc1943e61" UNIQUE ("group"), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "phone" ("id" SERIAL NOT NULL, "phone" character varying(15) NOT NULL, "isPhoneVerfied" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "countryDialingCodeId" integer, CONSTRAINT "UQ_c022eb633e3a0b81de5dac4002b" UNIQUE ("phone"), CONSTRAINT "PK_f35e6ee6c1232ce6462505c2b25" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "country_dialing_code" ("id" SERIAL NOT NULL, "countryDialingCode" character varying(3) NOT NULL, CONSTRAINT "UQ_3751478a6d1f1ac16a382b44717" UNIQUE ("countryDialingCode"), CONSTRAINT "PK_45c9e13b08a98050b7813cccdba" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "country" ("id" SERIAL NOT NULL, "country" character varying(200) NOT NULL, "countryISOCode2" character(2) NOT NULL, CONSTRAINT "UQ_f9c25d6ae5734b405b890d0ee52" UNIQUE ("country"), CONSTRAINT "UQ_394ebe607777c043029cb9a46bc" UNIQUE ("countryISOCode2"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "fname" character varying(50) NOT NULL, "lname" character varying(50) NOT NULL, "email" character varying(255) NOT NULL, "isEmailVerified" boolean NOT NULL DEFAULT false, "password" character varying(100) NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "countryId" integer, "groupId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "group_permissions_permission" ("groupId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_d9b4ec30d48ed8515908f47f691" PRIMARY KEY ("groupId", "permissionId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_24022d7e409de3835f25603d35" ON "group_permissions_permission" ("groupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0777702b851f7662e2678b4568" ON "group_permissions_permission" ("permissionId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "phone" ADD CONSTRAINT "FK_d1d3dd910fe87f4fe06412e1214" FOREIGN KEY ("countryDialingCodeId") REFERENCES "country_dialing_code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_4aaf6d02199282eb8d3931bff31" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_974590e8d8d4ceb64e30c38e051" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_permissions_permission" ADD CONSTRAINT "FK_24022d7e409de3835f25603d35d" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_permissions_permission" ADD CONSTRAINT "FK_0777702b851f7662e2678b45689" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group_permissions_permission" DROP CONSTRAINT "FK_0777702b851f7662e2678b45689"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_permissions_permission" DROP CONSTRAINT "FK_24022d7e409de3835f25603d35d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_974590e8d8d4ceb64e30c38e051"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_4aaf6d02199282eb8d3931bff31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "phone" DROP CONSTRAINT "FK_d1d3dd910fe87f4fe06412e1214"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0777702b851f7662e2678b4568"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_24022d7e409de3835f25603d35"`,
    );
    await queryRunner.query(`DROP TABLE "group_permissions_permission"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "country"`);
    await queryRunner.query(`DROP TABLE "country_dialing_code"`);
    await queryRunner.query(`DROP TABLE "phone"`);
    await queryRunner.query(`DROP TABLE "group"`);
    await queryRunner.query(`DROP TABLE "permission"`);
  }
}
