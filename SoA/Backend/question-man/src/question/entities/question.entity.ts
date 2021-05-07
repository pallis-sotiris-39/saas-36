import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from '../../answer/entities/answer.entity';
import { User } from "../../users/entities/user.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({ name: 'user_fk' })
  user: User;

  @Column()
  title: string;

  @Column()
  text: string;

  @OneToMany((type) => Answer, (answer) => answer.question)
  answers: Answer[];
}
