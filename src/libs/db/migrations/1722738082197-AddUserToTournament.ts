import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserToTournament1722738082197 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //update tournaments add user_id and join with users table
    await queryRunner.query(`ALTER TABLE tournaments ADD COLUMN user_id uuid`);
    await queryRunner.query(
      `ALTER TABLE tournaments ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //revert the changes
    await queryRunner.query(`ALTER TABLE tournaments DROP COLUMN user_id`);
    await queryRunner.query(
      `ALTER TABLE tournaments DROP CONSTRAINT fk_user_id`,
    );
  }
}
