import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RelacionarAgendamentoComProvedor1603887970021
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'agendamentos',
      new TableForeignKey({
        name: 'ProvedorDeAgendamento',
        columnNames: ['provedor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuarios',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('agendamentos', 'ProvedorDeAgendamento');
  }
}
