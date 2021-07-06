import { Column, JoinColumn, ManyToOne } from "typeorm";
import { Question } from "../../question/entities/question.entity";

export class Keyword {
  @ManyToOne(() => Question, (question) => question.keywords)
  @JoinColumn({ name: 'id' })
  id: number

  @Column({unique: true})
  word: string;
}
