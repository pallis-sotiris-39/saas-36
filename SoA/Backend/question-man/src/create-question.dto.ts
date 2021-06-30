export class CreateQuestionDto {
  readonly title: string;
  readonly text: string;
  readonly keywords: string[];
  readonly user: { id: number };
  readonly created: string;
}
