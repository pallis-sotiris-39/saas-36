import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "../../question/entities/question.entity";
import { Answer } from "../../answer/entities/answer.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name:string;

  @Column()
  last_name:string;

  @Column()
  username:string;

  @OneToMany(() => Question, (question)=> question.user)
  questions: Question[];

  @OneToMany(() => Answer, (answer)=> answer.user)
  answers: Answer[];
}
