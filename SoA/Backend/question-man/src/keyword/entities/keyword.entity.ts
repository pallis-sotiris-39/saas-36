import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "../../question/entities/question.entity";

@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  word: string;

  @ManyToMany(()=> Question, (question) => question.keywords)
  questions: Question[]
}
