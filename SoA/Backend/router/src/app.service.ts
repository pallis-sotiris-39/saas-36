import { HttpService, Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./create-question.dto";
import { CreateAnswerDto } from "./create-answer.dto";
import { CreateKeywordDto } from "./create-keyword.dto";

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {
  }

  signIn(username, password) {
    return this.httpService.post(`http://${process.env.AUTH_HOST}:${process.env.AUTH_PORT}/signin`,
      {
        username: username,
        password: password
      }).toPromise();
  }

  signUp(first_name, last_name, birthday, email, username, password) {
    return this.httpService.post(`http://${process.env.AUTH_HOST}:${process.env.AUTH_PORT}/signup`,
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
    return this.httpService.get(`http://${process.env.QMAN_HOST}:${process.env.QMAN_PORT}/` + url).toPromise();
  }

  getQuestionManOne(url: string, id: string) {
    return this.httpService.get(`http://${process.env.QMAN_HOST}:${process.env.QMAN_PORT}/${url}/${id}`).toPromise();
  }

  removeQuestionMan(url: string, id: string) {
    return this.httpService.delete(`http://${process.env.QMAN_HOST}:${process.env.QMAN_PORT}/${url}/${id}`).toPromise();
  }

  createQ(createQuestionDto: CreateQuestionDto) {
    return this.httpService.post(`http://${process.env.QMAN_HOST}:${process.env.QMAN_PORT}/question`,
      {
        title: createQuestionDto.title,
        text: createQuestionDto.text,
        created: createQuestionDto.created,
        keywords: createQuestionDto.keywords,
        user: createQuestionDto.user
      }).toPromise();
  }

  createA(createAnswerDto: CreateAnswerDto) {
    return this.httpService.post(`http://${process.env.QMAN_HOST}:${process.env.QMAN_PORT}/answer`,
      {
        text: createAnswerDto.text,
        created: createAnswerDto.created,
        question: createAnswerDto.question,
        user: createAnswerDto.user
      }).toPromise();
  }

  attachKeyword(createKeywordDto: CreateKeywordDto){
    return this.httpService.post(`http://${process.env.QMAN_HOST}:${process.env.QMAN_PORT}/keyword`,
      {
        word: createKeywordDto.word,
        id: createKeywordDto.id
      }).toPromise();
  }
}
