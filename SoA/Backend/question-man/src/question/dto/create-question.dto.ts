export class CreateQuestionDto {
  readonly title: string;
  readonly text: string;
  readonly user: { id: number };
}
