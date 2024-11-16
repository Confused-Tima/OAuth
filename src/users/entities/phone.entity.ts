import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CountryDialingCode } from './country-iso-code.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15, nullable: false, unique: true })
  phone: string;

  @Column({ default: false })
  isPhoneVerfied: boolean;

  @ManyToOne(() => CountryDialingCode, (dialingCode) => dialingCode.phone)
  countryDialingCode: CountryDialingCode;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.phone)
  user: User;
}
