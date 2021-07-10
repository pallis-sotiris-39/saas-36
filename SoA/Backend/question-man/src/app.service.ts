import { HttpService, Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./create-question.dto";
import { CreateAnswerDto } from "./create-answer.dto";

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {
  }

  // GET Request to Data Layer without parameters.
  getQuestionManNoParams(url: string) {
    return this.httpService.get(`http://${process.env.DATA_LAYER_HOST}:${process.env.DATA_LAYER_PORT}/` + url).toPromise();
  }

  // GET Request to Data Layer with one parameter.
  getQuestionManOne(url: string, id: string) {
    return this.httpService.get(`http://${process.env.DATA_LAYER_HOST}:${process.env.DATA_LAYER_PORT}/${url}/${id}`).toPromise();
  }

  // DELETE request to Data Layer
  removeQuestionMan(url: string, id: string) {
    return this.httpService.delete(`http://${process.env.DATA_LAYER_HOST}:${process.env.DATA_LAYER_PORT}/${url}/${id}`).toPromise();
  }

  // POST request to create a question with a DTO
  createQ(createQuestionDto: CreateQuestionDto) {
    return this.httpService.post(`http://${process.env.DATA_LAYER_HOST}:${process.env.DATA_LAYER_PORT}/question`,
      createQuestionDto).toPromise();
  }

  //POST request to create an answer with a DTO
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
