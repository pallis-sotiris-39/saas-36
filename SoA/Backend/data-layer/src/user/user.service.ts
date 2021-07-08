import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findAll(): Promise<User[]>{
    return this.manager.find(User);
  }

  async findOne(userID: number): Promise<User> {
    return this.manager.findOne(User, userID, {relations: ["questions", "answers"]});
  }
}
