import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { Country } from './country.entity';
import { Phone } from './phone.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  fname: string;

  @Column({ length: 50, nullable: true })
  lname: string;

  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Exclude()
  @Column('varchar', { length: 100, nullable: false })
  password: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Phone, (phone) => phone.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  phone: Phone;

  @ManyToOne(() => Country, (country) => country.user)
  country: Country;

  @ManyToOne(() => Group, (group) => group.user)
  @JoinColumn()
  group: Group;
}
