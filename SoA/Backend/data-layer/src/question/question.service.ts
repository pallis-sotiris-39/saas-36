import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { User } from "../user/entities/user.entity";

@Injectable()
export class QuestionService {
  constructor(
    @InjectEntityManager() private manager: EntityManager
  ) {}

  // Create a question using the DTO
  async create(createQuestionDto: CreateQuestionDto) : Promise<Question> {
    return this.manager.transaction(async manager => {

      const userID = createQuestionDto.user.id;
      if(!userID) throw new BadRequestException('User id missing');

      const user = await manager.findOne(User, userID);
      if(!user) throw new NotFoundException(`User with id: ${userID} not found`);

      const question = await manager.create(Question, createQuestionDto);
      return manager.save(question);
    });
  }

  // Return all questions in DB
  async findAll() : Promise<Question[]> {
    return this.manager.find(Question, {relations: ["user", "answers", "keywords"]});
  }

  // Return a question based on it's id
  async findOne(id: number) : Promise<Question> {
    const question = await this.manager.findOne(Question, id, {relations: ["user", "answers", "keywords"]})
    if (!question) throw new NotFoundException(`Question with id: ${id} not found`)
    return question;
  }

  // Delete a question
  async remove(id: number) : Promise<void>{
    return this.manager.transaction(async manager => {
      const question = await manager.findOne(Question, id);
      if (!question) throw new NotFoundException(`Question with id: ${id} not found`)
      await manager.delete(Question, id);
    });
  }
}
