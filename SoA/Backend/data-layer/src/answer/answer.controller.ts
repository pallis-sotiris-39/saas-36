import { Controller, Get, Post, Body, Param, Delete, HttpException } from "@nestjs/common";
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto).catch(err => {
      throw new HttpException({
        message: err.message,

      }, err.statusCode)
    });
  }

  @Get()
  findAll() {
    return this.answerService.findAll().catch(err => {
      throw new HttpException({
        message: err.message,

      }, err.statusCode)
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id).catch(err => {
      throw new HttpException({
        message: err.message,

      }, err.statusCode)
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id).catch(err => {
      throw new HttpException({
        message: err.message,

      }, err.statusCode)
    });
  }
}
