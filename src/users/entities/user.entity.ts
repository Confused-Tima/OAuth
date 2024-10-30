import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  fname: string;

  @Column({ length: 50 })
  lname: string;

  @Column({ length: 255, nullable: false })
  email: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Exclude()
  @Column('varchar', { length: 100, select: false, nullable: false })
  password: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ default: false })
  isPhoneVerfied: boolean;

  @Column({ length: 3 })
  countryDialingCode: string;

  @Column({ length: 100 })
  country: string;

  @Column({ length: 5 })
  countryISOCode: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Group, (group) => group.user)
  @JoinColumn()
  group: Group;
}
