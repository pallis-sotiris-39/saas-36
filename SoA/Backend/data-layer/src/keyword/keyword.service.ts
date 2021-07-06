import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { Keyword } from "./entities/keyword.entity";


@Injectable()
export class KeywordService {
  constructor(
    @InjectEntityManager() private manager: EntityManager
  ) {}

  async create(createKeywordDto: CreateKeywordDto): Promise<Keyword> {
    return this.manager.transaction(async manager => {
      const answer = await manager.create(Keyword, createKeywordDto);
      return manager.save(answer);
    })
  }

  async findAll() {
    return this.manager.find(Keyword);
  }

  async findOne(word: number) {
    const keyword = await this.manager.findOne(Keyword, word, {relations: ["question"]});
    if (!keyword) throw new NotFoundException(`Keyword ${word} not found`);
    return keyword;
  }

  remove(id: number) {
    return `This action removes a #${id} keyword`;
  }
}
