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

  @PrimaryColumn()
  keyword: string;

  @ManyToMany(() => Question, (question) => question.keywords)
  @JoinTable({
    name: 'question_keyword',
    joinColumn: {
      name: 'keyword',
      referencedColumnName: 'keyword'
    },
    inverseJoinColumn: {
      name: 'questionid',
      referencedColumnName: 'id'
    }
  })
  questions: Question[];
}
