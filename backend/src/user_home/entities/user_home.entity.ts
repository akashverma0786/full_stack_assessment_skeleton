import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Adjust the path as needed
import { Home } from '../../home/entities/home.entity'; // Adjust the path as needed

@Entity()
export class UserHome {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  home_id: number;

  @ManyToOne(() => User, (user) => user.userHomes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Home, (home) => home.userHomes)
  @JoinColumn({ name: 'home_id' })
  home: Home;
}
// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';
// import { User } from '../../users/entities/user.entity'; // Adjust the path as needed
// import { Home } from '../../home/entities/home.entity'; // Adjust the path as needed

// @Entity()
// export class UserHome {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   user_id: number;

//   @Column()
//   home_id: number;

//   @ManyToOne(() => User, (user) => user.userHomes)
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//   @ManyToOne(() => Home, (home) => home.userHomes)
//   @JoinColumn({ name: 'home_id' })
//   home: Home;
// }

// // export class UserHome {}
