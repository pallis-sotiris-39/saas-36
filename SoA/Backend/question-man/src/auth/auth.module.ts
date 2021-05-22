import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";


@Module({
  imports:[UserModule, JwtModule.register({secret: jwtConstants.secret}), TypeOrmModule.forFeature([User])],
  providers: [AuthService, JwtStrategy, UserService],
  exports: [AuthService],
})
export class AuthModule {}
