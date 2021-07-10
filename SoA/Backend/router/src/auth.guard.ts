import { CanActivate, ExecutionContext, HttpService, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

//Guard that authenticates by making a GET Request to the Authentication service
@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private httpService: HttpService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    try {
      // Make a request to the Authentication WHOAMI API using the provided token
      let result = (await this.httpService.get(`http://${process.env.AUTH_HOST}:${process.env.AUTH_PORT}/whoami`,
        {
          headers: {
            Authorization: request.headers.authorization
          }
        }).toPromise()).status;

      //If Request succeeds then user is authenticated
      return result == HttpStatus.OK;
    } catch (e) {
      // If Request fails then user is not authenticated
      return false;
    }
  }
}