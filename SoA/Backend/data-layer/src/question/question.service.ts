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

  async attach(keywords: string[], id: number){
    for (const word in keywords){
      try {
        await this.manager.query(`INSERT INTO question_keyword VALUES (${id}, ${word})`);
      }catch (e){
        throw e
      }
    }
    return;
  }

  async findAll() : Promise<Question[]> {
    return this.manager.find(Question, {relations: ["keywords"]});
  }

  async findOne(id: number) : Promise<Question> {
    const question = await this.manager.findOne(Question, id, {relations: ["user", "answers"]})
    if (!question) throw new NotFoundException(`Question with id: ${id} not found`)
    return question;
  }

  async remove(id: number) : Promise<void>{
    return this.manager.transaction(async manager => {
      const question = await manager.findOne(Question, id, {relations: ["user", "answers"]})
      if (!question) throw new NotFoundException(`Question with id: ${id} not found`)
      await manager.delete(Question, id);
    });
  }
}
