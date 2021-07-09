import { CanActivate, ExecutionContext, HttpService, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private httpService: HttpService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      let result = (await this.httpService.get(`http://${process.env.AUTH_HOST}:${process.env.AUTH_PORT}/whoami`,
        {
          headers: {
            Authorization: request.headers.authorization
          }
        }).toPromise()).status;
      return result == HttpStatus.OK;
    } catch (e) {
      return false;
    }
  }
}