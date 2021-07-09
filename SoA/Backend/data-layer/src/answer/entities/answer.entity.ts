import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from '../../question/entities/question.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  created: string;

  @Column()
  user_fk:number;

  @Column()
  question_fk: number;

  @ManyToOne(() => User, (user) => user.answers)
  @JoinColumn({ name: 'user_fk' })
  user: User;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_fk' })
  question: Question;
}
