import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class StudentsEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 30 })
  name: string;

  @Field()
  @Column({ length: 30 })
  surname: string;

  @Field()
  @Column('date')
  birth: Date;
}
