import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus } from "@nestjs/common";
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    try {
      return this.answerService.create(createAnswerDto);
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
      return this.answerService.findAll();
    } catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.answerService.findOne(+id);
    } catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.answerService.remove(+id);
    } catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
    }
  }

  @Get('/user/:id')
  getAnswersUser(@Param('id') id: string){
    try {
      return this.answerService.findByUserId(+id);
    }catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
    }
  }

}
