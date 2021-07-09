import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from "@nestjs/common";
import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Post()
  create(@Body() createKeywordDto: CreateKeywordDto) {
    try {
      return this.keywordService.create(createKeywordDto);
    } catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
    }
  }

  @Get()
  findAll() {
    try {
      return this.keywordService.findAll();
    } catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
    }
  }

  @Get(':word')
  findOne(@Param('word') word: string) {
    try {
      return this.keywordService.findOne(word);
    }catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
    }
  }

  @Delete(':word')
  remove(@Param('word') word: string) {
    try {
      return this.keywordService.remove(word);
    } catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
    }
  }
}
