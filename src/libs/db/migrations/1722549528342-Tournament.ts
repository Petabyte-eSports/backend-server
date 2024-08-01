import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Tournament1722549528342 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tournaments',
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
            name: 'tournament_name',
            type: 'varchar',
          },
          {
            name: 'game_type_id',
            type: 'uuid',
          },
          {
            name: 'image_url',
            type: 'varchar',
          },
          {
            name: 'country_id',
            type: 'uuid',
          },
          {
            name: 'state_id',
            type: 'uuid',
          },
          {
            name: 'about',
            type: 'text',
          },
          {
            name: 'rules',
            type: 'text',
          },
          {
            name: 'prizes',
            type: 'jsonb',
          },
          {
            name: 'platforms',
            type: 'jsonb',
          },
          {
            name: 'entry_fee',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: 'entry_fee_type',
            type: 'varchar',
          },
          {
            name: 'participant_limit',
            type: 'int',
          },
          {
            name: 'is_promote',
            type: 'boolean',
            default: false,
          },
          //is_verified
          {
            name: 'is_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'start_date',
            type: 'timestamp',
          },
          {
            name: 'end_date',
            type: 'timestamp',
          },
          {
            name: 'status',
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
          {
            name: 'is_deleted',
            type: 'boolean',
            default: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['game_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'game_types',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['country_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'countries',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['state_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'states',
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          {
            columnNames: ['game_type_id'],
          },
          {
            columnNames: ['country_id'],
          },
          {
            columnNames: ['state_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tournaments');
  }
}
