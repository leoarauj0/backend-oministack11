import { id } from 'date-fns/locale';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CriarAgendamentos1603718833710
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'agendamentos',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provedor',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'data',
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('agendamentos');
  }
}
