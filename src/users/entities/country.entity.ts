import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CountryDialingCode } from './country-iso-code.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: false, unique: true })
  country: string;

  @Column('char', { length: 2, nullable: false, unique: true })
  countryISOCode2: string;

  @OneToOne(() => CountryDialingCode, (dialingCode) => dialingCode.country)
  countryDialingCode: string;

  @OneToMany(() => User, (user) => user.country)
  user: User[];
}
