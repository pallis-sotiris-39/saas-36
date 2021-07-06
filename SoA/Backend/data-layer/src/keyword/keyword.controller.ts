import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Post()
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordService.create(createKeywordDto);
  }

  @Get()
  findAll() {
    return this.keywordService.findAll();
  }

  @Get(':word')
  findOne(@Param('word') word: string) {
    return this.keywordService.findOne(+word);
  }
}
