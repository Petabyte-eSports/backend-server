import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class State1722549023088 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'states',
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
            name: 'name',
            type: 'varchar',
          },
          //relationship with country_id in countries table
          {
            name: 'country_id',
            type: 'uuid',
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
            columnNames: ['country_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'countries',
          },
        ],
        indices: [
          {
            name: 'IDX_STATE_COUNTRY_ID',
            columnNames: ['country_id'],
          },
          //name
          {
            name: 'IDX_STATE_NAME',
            columnNames: ['name'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('states');
  }
}
