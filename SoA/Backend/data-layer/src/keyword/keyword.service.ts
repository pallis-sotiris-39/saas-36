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
    return this.manager.find(Keyword, {relations: ["questions"]});
  }

  async findOne(word: string): Promise<Keyword> {
    const keyword =  await this.manager.findOne(Keyword, word, {relations: ["questions"]})
    if (!keyword) throw new NotFoundException(`Keyword ${word} not found`);
    return keyword;
  }

  async remove(word: string): Promise<void> {
    return this.manager.transaction(async manager => {
      const keyword = await manager.findOne(Keyword, word);
      if (!keyword) throw new NotFoundException(`Keyword with id: ${word} not found`);
      await manager.delete(Keyword, word);
    })
  }
}
