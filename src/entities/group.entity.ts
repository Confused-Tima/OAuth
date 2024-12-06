import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false, unique: true })
  group: string;

  @ManyToMany(() => Permission, (permission) => permission.groups)
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => User, (user) => user.group)
  user: User;
}
