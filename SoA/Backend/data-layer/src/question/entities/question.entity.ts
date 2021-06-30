import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, Timestamp
} from "typeorm";
import { Answer } from '../../answer/entities/answer.entity';
import { User } from "../../user/entities/user.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({ name: 'user_fk' })
  user: User;

  @Column({unique: true})
  title: string;

  @Column()
  text: string;

  @Column()
  created: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
