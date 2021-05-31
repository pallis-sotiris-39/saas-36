import { HttpService, Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  constructor(private httpService: HttpService){}

  async getQuestionManNoParams(url: string): Promise<any>{
    return this.httpService.get('http://localhost:3003/' + url).toPromise();
  }

  signIn(username , password){
    return this.httpService.post('http://localhost:3002/signin',
      {
        username : username,
        password: password
      }).toPromise();
  }

}
