import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: false, unique: true })
  country: string;

  @Column('char', { length: 2, nullable: false, unique: true })
  countryISOCode2: string;

  @Column({ length: 3, nullable: false, unique: true })
  countryDialingCode: string;
}
