import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { UserHome } from '../../user_home/entities/user_home.entity';

@Entity()
export class User {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @OneToMany(() => UserHome, (userHome) => userHome.user)
  userHomes: UserHome[];
}

// export class User {}
