import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Skill {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  startDate?: string;

  @Column()
  completionDate?: string;

  @Column()
  courses: string[];
}
