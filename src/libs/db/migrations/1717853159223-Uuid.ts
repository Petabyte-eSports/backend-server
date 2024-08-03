import { MigrationInterface, QueryRunner } from 'typeorm';

export class Uuid1717853159223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //CREATE EXTENSION "uuid-ossp";
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //DROP EXTENSION "uuid-ossp";
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
  }
}
