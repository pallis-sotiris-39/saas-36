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

  async findOne(id: number): Promise<Keyword> {
    const keyword =  await this.manager.findOne(Keyword, id, {relations: ["questions"]})
    if (!keyword) throw new NotFoundException(`Keyword with id ${id} not found`);
    return keyword;
  }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async manager => {
      const keyword = await manager.findOne(Keyword, id);
      if (!keyword) throw new NotFoundException(`Keyword with id: ${id} not found`);
      await manager.delete(Keyword, id);
    })
  }

  async findOneWord(word: string): Promise<Keyword> {
    const keyword = await this.manager.findOne(Keyword, {keyword: word}, {relations: ["questions"]});
    if(!keyword) throw new NotFoundException(`Questions with keyword ${word} not found`)
    return keyword;
  }
}
