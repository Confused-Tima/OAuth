import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';

export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, length: 100 })
  name: string;

  @ManyToMany(() => Group, (group) => group.permissions)
  groups: Group[];
}
