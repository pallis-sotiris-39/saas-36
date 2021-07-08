import {
  Column,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, Timestamp
} from "typeorm";
import { Answer } from '../../answer/entities/answer.entity';
import { User } from "../../user/entities/user.entity";
import { Keyword } from "../../keyword/entities/keyword.entity";

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

  @ManyToMany(() => Keyword, (keyword) => keyword.questions, {cascade: true})
  @JoinTable({
    name: 'question_keyword',
    joinColumn: {
      name: 'questionid',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'keywordid',
      referencedColumnName: 'id'
    }
  })
  keywords: Keyword[];
}
