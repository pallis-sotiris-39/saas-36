import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { Question } from "../question/entities/question.entity";
import { Keyword } from "./entities/keyword.entity";

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  create(createKeywordDto: CreateKeywordDto) {
    return this.manager.transaction(async manager => {
      const questionID = createKeywordDto.question.id;
      if(!questionID) throw new BadRequestException('Question ID is missing.')
      const question = await this.manager.findOne(Question, questionID);
      if(!question) throw new NotFoundException('Question with ID ${questionID} not found.')
      const keyword = await manager.create(Keyword, createKeywordDto);
      return manager.save(keyword);
    });
  }

  findAll() {
    return `This action returns all keyword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} keyword`;
  }

  update(id: number, updateKeywordDto: UpdateKeywordDto) {
    return `This action updates a #${id} keyword`;
  }

  remove(id: number) {
    return `This action removes a #${id} keyword`;
  }
}
