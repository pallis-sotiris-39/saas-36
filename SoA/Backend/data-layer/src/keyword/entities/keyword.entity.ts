import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import { Question } from "../../question/entities/question.entity";

@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyword: string;

  @ManyToMany(() => Question, (question) => question.keywords)
  @JoinTable({
    name: 'question_keyword',
    joinColumn: {
      name: 'keywordid',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'questionid',
      referencedColumnName: 'id'
    }
  })
  questions: Question[];
}
