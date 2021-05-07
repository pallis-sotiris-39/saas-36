import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.answers)
  @JoinColumn({ name: 'user_fk' })
  user: User;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_fk' })
  question: Question;
}
