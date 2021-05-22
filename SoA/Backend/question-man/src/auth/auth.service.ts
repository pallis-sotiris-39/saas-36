import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(userID: number, pass: string): Promise<any> {
    const user = await this.userService.findOne(userID);
    let passwordFromBase = user.password;
    bcrypt.compare(pass, passwordFromBase, (err, result) => {
      if(err){
        throw err
      }
      return result ?  {userID: user.id} : null
    })
  }
}
