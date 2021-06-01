import { HttpService, Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  constructor(private httpService: HttpService){}

  signIn(username , password){
    return this.httpService.post('http://localhost:3002/signin',
      {
        username : username,
        password: password
      }).toPromise();
  }

  signUp(first_name, last_name, birthday, email, username, password){
    return this.httpService.post('http://localhost:3002/signup',
      {
        first_name: first_name,
        last_name: last_name,
        birthday:birthday,
        email:email,
        username : username,
        password: password
      }).toPromise();
  }

  getQuestionManNoParams(url: string){
    return this.httpService.get('http://localhost:3004/' + url).toPromise();
  }

  getQuestionManOne(url: string, id: string){
    return this.httpService.get(`http://localhost:3004/${url}/${id}`).toPromise();
  }

  removeQuestionMan(url: string, id: string){
    return this.httpService.delete(`http://localhost:3004/${url}/${id}`).toPromise();
  }

  createQ(title, text, created, keywords, user){
    return this.httpService.post('http://localhost:3004/question',
      {
        title: title,
        text: text,
        created: created,
        keywords: keywords,
        user: user
      }).toPromise()
  }

  createA(text, created, question, user){
    return this.httpService.post('http://localhost:3004/answer',
      {
        text: text,
        created: created,
        question: question,
        user: user
      }).toPromise()
  }
}
