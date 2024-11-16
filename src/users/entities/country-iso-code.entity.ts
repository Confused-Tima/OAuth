import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Phone } from './phone.entity';
import { Country } from './country.entity';

@Entity()
export class CountryDialingCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 3, nullable: false, unique: true })
  countryDialingCode: string;

  @OneToMany(() => Phone, (phone) => phone.countryDialingCode)
  phone: Phone[];

  @OneToOne(() => Country, (country) => country.countryDialingCode)
  country: Country;
}
