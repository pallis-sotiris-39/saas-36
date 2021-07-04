import { HttpService, Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./create-question.dto";
import { CreateAnswerDto } from "./create-answer.dto";

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {
  }

  getQuestionManNoParams(url: string) {
    return this.httpService.get("http://localhost:3004/" + url).toPromise();
  }

  getQuestionManOne(url: string, id: string) {
    return this.httpService.get(`http://localhost:3004/${url}/${id}`).toPromise();
  }

  removeQuestionMan(url: string, id: string) {
    return this.httpService.delete(`http://localhost:3004/${url}/${id}`).toPromise();
  }

  createQ(createQuestionDto: CreateQuestionDto) {
    console.log("BLAH");
    return this.httpService.post('http://localhost:3004/question',
      {
        title: createQuestionDto.title,
        text: createQuestionDto.text,
        created: createQuestionDto.created,
        user: createQuestionDto.user
      }).toPromise();
  }

  attachKeyword(keyword: string, id: number){
    return this.httpService.post('http://localhost:3004/keyword',
      {
        keyword: keyword,
        id: id
      }).toPromise();
  }

  createA(createAnswerDto: CreateAnswerDto) {
    return this.httpService.post('http://localhost:3004/answer',
      {
        text: createAnswerDto.text,
        created: createAnswerDto.created,
        question: createAnswerDto.question,
        user: createAnswerDto.user
      }).toPromise();
  }
}
