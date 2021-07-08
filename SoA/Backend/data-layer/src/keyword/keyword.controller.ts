import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from "@nestjs/common";
import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Post()
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordService.create(createKeywordDto).catch(err => {
      throw new HttpException({
        message: err.message,

      }, err.statusCode)
    });
  }

  @Get()
  findAll() {
    return this.keywordService.findAll().catch(err => {
      throw new HttpException({
        message: err.message,

      }, err.statusCode)
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.keywordService.findOne(id).catch(err => {
      throw new HttpException({
        message: err.message,

      }, err.statusCode)
    });
  }

  @Get('/word/:word')
  findOneWord(@Param('word') word: string){
    return this.keywordService.findOneWord(word).catch(err => {
        throw new HttpException({
          message: err.message,

        }, err.statusCode)
      }

    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keywordService.remove(+id).catch(err => {
      throw new HttpException({
        message: err.message,

      }, err.statusCode)
    });
  }
}
