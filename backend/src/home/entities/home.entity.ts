import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { UserHome } from '../../user_home/entities/user_home.entity'; // Adjust the path as needed

@Entity()
export class Home {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn()
  home_id: number;

  @Column()
  street_address: string;

  @Column()
  state_name: string;

  @Column()
  zip: string;

  @Column('decimal', { precision: 10, scale: 2 })
  sqft: number;

  @Column('int')
  beds: number;

  @Column('int')
  baths: number;

  @Column('decimal', { precision: 15, scale: 2 })
  list_price: number;

  @OneToMany(() => UserHome, (userHome) => userHome.home)
  userHomes: UserHome[];
}

// export class Home {}
