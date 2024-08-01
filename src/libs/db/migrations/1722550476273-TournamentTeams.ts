import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TournamentTeams1722550476273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tournament_teams',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'tournament_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          //role
          {
            name: 'role',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['tournament_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tournaments',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          {
            columnNames: ['tournament_id'],
          },
          {
            columnNames: ['user_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tournament_teams');
  }
}
