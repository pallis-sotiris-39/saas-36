import { HttpService, Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./create-question.dto";
import { CreateAnswerDto } from "./create-answer.dto";

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {
  }

  getQuestionManNoParams(url: string) {
    return this.httpService.get(`http://${process.env.DATA_LAYER_HOST}:${process.env.DATA_LAYER_PORT}/` + url).toPromise();
  }

  getQuestionManOne(url: string, id: string) {
    return this.httpService.get(`http://${process.env.DATA_LAYER_HOST}:${process.env.DATA_LAYER_PORT}/${url}/${id}`).toPromise();
  }

  removeQuestionMan(url: string, id: string) {
    return this.httpService.delete(`http://${process.env.DATA_LAYER_HOST}:${process.env.DATA_LAYER_PORT}/${url}/${id}`).toPromise();
  }

  createQ(createQuestionDto: CreateQuestionDto) {
    return this.httpService.post(`http://${process.env.DATA_LAYER_HOST}:${process.env.DATA_LAYER_PORT}/question`,
      createQuestionDto).toPromise();
  }

  attachKeyword(keyword: string, questionid: number){
    return this.httpService.post(`http://${process.env.DATA_LAYER_HOST}:${process.env.DATA_LAYER_PORT}/keyword`,
      {
        keyword: keyword,
        questionid: questionid
      }).toPromise();
  }

  createA(createAnswerDto: CreateAnswerDto) {
    return this.httpService.post(`http://${process.env.DATA_LAYER_HOST}:${process.env.DATA_LAYER_PORT}/answer`,
      {
        text: createAnswerDto.text,
        created: createAnswerDto.created,
        question: createAnswerDto.question,
        user: createAnswerDto.user
      }).toPromise();
  }
}
