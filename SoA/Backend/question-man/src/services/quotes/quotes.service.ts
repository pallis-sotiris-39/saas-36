import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class QuotesService {

  constructor(private http: HttpService ) {}

  async getWhoAmI(token: string){
    try {
      return await this.http.get("http://localhost:3001/whoami", {
        headers: {
          "Authorization": "Bearer " + token
        },
        responseType: "json"
      }).toPromise();
    }catch (e) {
      throw e
    }
  }
}
