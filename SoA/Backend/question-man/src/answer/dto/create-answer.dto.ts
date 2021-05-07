export class CreateAnswerDto {
  readonly text: string;
  readonly question: { id: number };
  readonly user: { id: number };
}
