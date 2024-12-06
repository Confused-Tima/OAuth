import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CountryDialingCode } from './country-dialing-code.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: false, unique: true })
  country: string;

  @Column('char', { length: 2, nullable: false, unique: true })
  countryISOCode2: string;

  @OneToOne(() => CountryDialingCode, (dialingCode) => dialingCode.country)
  @JoinColumn()
  countryDialingCode: CountryDialingCode;

  @OneToMany(() => User, (user) => user.country)
  user: User[];
}
