import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from "./entities/answer.entity";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { Question } from "../question/entities/question.entity";
import { User } from "../user/entities/user.entity";

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  //Create an answer using a DTO
  async create(createAnswerDto: CreateAnswerDto) : Promise<Answer> {
    return this.manager.transaction(async manager => {

      const questionID = createAnswerDto.question.id;
      if(!questionID) throw new BadRequestException('Question id missing');

      const userID = createAnswerDto.user.id;
      if(!userID) throw new BadRequestException('User id missing');

      const question = manager.findOne(Question, questionID);
      if(!question) throw new NotFoundException(`Question with id: ${questionID} not found`);

      const user = manager.findOne(User, userID);
      if(!user) throw new NotFoundException(`User with id: ${userID} not found`);

      const answer = await manager.create(Answer, createAnswerDto);
      return manager.save(answer);
    });
  }

  //Return all answers in DB along with their respective user and question
  async findAll() : Promise<Answer[]> {
    return this.manager.find(Answer, {relations: ["question", "user"]});
  }

  //Return one answer along with it's user and question
  async findOne(id: number) : Promise<Answer> {
    const answer = await this.manager.findOne(Answer, id, {relations: ["question", "user"]})
    if (!answer) throw new NotFoundException(`Answer with id: ${id} not found`)
    return answer;
  }

  // Delete an answer
  async remove(id: number) : Promise<void>{
    return this.manager.transaction(async manager => {
      const answer = await manager.findOne(Answer, id, {relations: ["question", "user"]})
      if (!answer) throw new NotFoundException(`Answer with id: ${id} not found`)
      await manager.delete(Answer, id);
    });
  }

  // Find an answer by the id of the user that made it
  async findByUserId(id: number) : Promise<Answer[]>{
    return this.manager.find(Answer, {where: {user_fk: id}, relations: ["question", "user"]})
  }
}