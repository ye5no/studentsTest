import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 30 })
  surname: string;

  @Column('date')
  birth: Date;
}
