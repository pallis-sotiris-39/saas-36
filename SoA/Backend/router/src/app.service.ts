import { HttpService, Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./create-question.dto";
import { CreateAnswerDto } from "./create-answer.dto";

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {
  }

  signIn(username, password) {
    return this.httpService.post("http://localhost:3002/signin",
      {
        username: username,
        password: password
      }).toPromise();
  }

  signUp(first_name, last_name, birthday, email, username, password) {
    return this.httpService.post("http://localhost:3002/signup",
      {
        first_name: first_name,
        last_name: last_name,
        birthday: birthday,
        email: email,
        username: username,
        password: password
      }).toPromise();
  }

  getQuestionManNoParams(url: string) {
    return this.httpService.get("http://localhost:3003/" + url).toPromise();
  }

  getQuestionManOne(url: string, id: string) {
    return this.httpService.get(`http://localhost:3003/${url}/${id}`).toPromise();
  }

  removeQuestionMan(url: string, id: string) {
    return this.httpService.delete(`http://localhost:3003/${url}/${id}`).toPromise();
  }

  createQ(createQuestionDto: CreateQuestionDto) {
    return this.httpService.post("http://localhost:3003/question",
      {
        title: createQuestionDto.title,
        text: createQuestionDto.text,
        created: createQuestionDto.created,
        keywords: createQuestionDto.keywords,
        user: createQuestionDto.user
      }).toPromise();
  }

  createA(createAnswerDto: CreateAnswerDto) {
    return this.httpService.post("http://localhost:3003/answer",
      {
        text: createAnswerDto.text,
        created: createAnswerDto.created,
        question: createAnswerDto.question,
        user: createAnswerDto.user
      }).toPromise();
  }
}
