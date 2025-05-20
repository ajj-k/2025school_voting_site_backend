import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'mentors' })
export class Mentor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int', default: 0 })
  count: number;
}
