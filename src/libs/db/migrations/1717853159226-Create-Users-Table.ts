import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1717853159226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExist = await queryRunner.hasTable('users');
    if (!tableExist) {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()', // Ensure uuid-ossp extension is enabled in PostgreSQL
            },
            {
              name: 'name',
              type: 'varchar',
            },
            //country_id
            {
              name: 'country_id',
              type: 'uuid',
            },
            //state_id
            {
              name: 'state_id',
              type: 'uuid',
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'username',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'phone',
              type: 'varchar', // Assuming phone numbers are stored as strings
              isUnique: true,
            },
            {
              name: 'user_id',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'notification_token',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'bio',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'gender',
              type: 'varchar',
              default: "'other'", // Quotes around string values
            },
            {
              name: 'avatar',
              type: 'varchar',
              default:
                "'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg'",
            },
            {
              name: 'point',
              type: 'int',
              default: 0,
            },
            {
              name: 'is_active',
              type: 'boolean',
              default: true,
            },
            {
              name: 'is_email_verified',
              type: 'boolean',
              default: false,
            },
            {
              name: 'is_phone_verified',
              type: 'boolean',
              default: false,
            },
            {
              name: 'email_verified_at',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'phone_verified_at',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'account_status',
              type: 'varchar',
              default: "'pending'", // Quotes around string values
            },
            {
              name: 'rank',
              type: 'varchar',
              default: "'novice'",
            },
            {
              name: 'password',
              type: 'text',
            },
            {
              name: 'pin',
              type: 'text',
              isNullable: true,
            },
            //kyc json
            {
              name: 'kyc',
              type: 'jsonb',
              isNullable: true,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
          ],
          foreignKeys: [
            {
              columnNames: ['country_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'countries',
            },
            {
              columnNames: ['state_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'states',
            },
          ],
          indices: [
            {
              name: 'IDX_USER_COUNTRY_ID',
              columnNames: ['country_id'],
            },
            {
              name: 'IDX_USER_STATE_ID',
              columnNames: ['state_id'],
            },
            {
              name: 'IDX_USER_EMAIL',
              columnNames: ['email'],
            },
            {
              name: 'IDX_USER_PHONE',
              columnNames: ['phone'],
            },
            {
              name: 'IDX_USER_USER_ID',
              columnNames: ['user_id'],
            },
          ],
        }),
        true, // This will create the table if it doesn't exist
      );
    } else {
      console.log('Users table already exist');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
