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

  whoami(token: string){
    return this.httpService.get(`http://${process.env.AUTH_HOST}:${process.env.AUTH_PORT}/whoami`,
      {
        headers: {
          Authorization: token
        }
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

  // GET Request to Data Layer without parameters.
  getQuestionManNoParams(url: string) {
    return this.httpService.get(`http://${process.env.QMAN_HOST}:${process.env.QMAN_PORT}/` + url).toPromise();
  }

  // GET Request to Data Layer with one parameter.
  getQuestionManOne(url: string, id: string) {
    return this.httpService.get(`http://${process.env.QMAN_HOST}:${process.env.QMAN_PORT}/${url}/${id}`).toPromise();
  }

  // DELETE request to Data Layer
  removeQuestionMan(url: string, id: string) {
    return this.httpService.delete(`http://${process.env.QMAN_HOST}:${process.env.QMAN_PORT}/${url}/${id}`).toPromise();
  }

  // POST request to create a question with a DTO
  createQ(createQuestionDto: CreateQuestionDto) {
    return this.httpService.post(`http://${process.env.QMAN_HOST}:${process.env.QMAN_PORT}/question`,
      createQuestionDto).toPromise();
  }

  //POST request to create an answer with a DTO
  createA(createAnswerDto: CreateAnswerDto) {
    return this.httpService.post(`http://${process.env.QMAN_HOST}:${process.env.QMAN_PORT}/answer`,
      {
        text: createAnswerDto.text,
        created: createAnswerDto.created,
        question: createAnswerDto.question,
        user: createAnswerDto.user
      }).toPromise();
  }
}
