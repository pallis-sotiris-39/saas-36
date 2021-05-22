import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class QuestionService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private userService: UserService
  ) {}

  async create(createQuestionDto: CreateQuestionDto) : Promise<Question> {
    return this.manager.transaction(async manager => {
      const userID = createQuestionDto.user.id;
      if(!userID) throw new BadRequestException('User id missing');
      const user = await manager.findOne(User, userID, {relations: ['questions', 'answers']});
      if(!user) throw new NotFoundException(`User with id: ${userID} not found`);
      const question = await manager.create(Question, createQuestionDto);
      return manager.save(question);
    });
  }

  async findAll() : Promise<Question[]> {
    return this.manager.find(Question);
  }

  async findOne(id: number) : Promise<Question> {
    const question = await this.manager.findOne(Question, id, {relations: ["user", "keywords", "answers"]})
    if (!question) throw new NotFoundException(`Question with id: ${id} not found`)
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) : Promise<Question> {
    return this.manager.transaction(async manager => {
      const question = await manager.findOne(Question, id, {relations: ["user", "keywords", "answers"]})
      if (!question) throw new NotFoundException(`Question with id: ${id} not found`)
      manager.merge(Question, question, updateQuestionDto);
      return manager.save(question);
    });
  }

  async remove(id: number) : Promise<void>{
    return this.manager.transaction(async manager => {
      const question = await manager.findOne(Question, id, {relations: ["user", "keywords", "answers"]})
      if (!question) throw new NotFoundException(`Question with id: ${id} not found`)
      await manager.delete(Question, id);
    });
  }
}
