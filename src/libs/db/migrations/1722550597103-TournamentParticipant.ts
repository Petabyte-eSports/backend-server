import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TournamentParticipant1722550597103 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tournament_participants',
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
          //gametag
          {
            name: 'gametag',
            type: 'varchar',
          },
          //is_qualify
          {
            name: 'is_qualify',
            type: 'boolean',
            default: false,
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
    await queryRunner.dropTable('tournament_participants');
  }
}
