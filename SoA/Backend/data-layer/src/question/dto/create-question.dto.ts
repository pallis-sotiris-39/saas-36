import { Keyword } from "../../keyword/entities/keyword.entity";

export class CreateQuestionDto {
  readonly title: string;
  readonly text: string;
  readonly keywords: Keyword[];
  readonly user: { id: number };
  readonly created: string;
}
