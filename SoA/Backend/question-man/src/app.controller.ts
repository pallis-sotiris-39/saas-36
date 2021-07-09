import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post} from "@nestjs/common";
import { AppService } from './app.service';
import { CreateQuestionDto } from "./create-question.dto";
import { CreateAnswerDto } from "./create-answer.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('question')
  async createQ(@Body() createQuestionDto: CreateQuestionDto) {
    try {
      return (await this.appService.createQ(createQuestionDto)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Get('question')
  async findAllQ() {
    try {
      return (await this.appService.getQuestionManNoParams('question')).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Get('question/:id')
  async findOneQ(@Param('id') id: string) {
    try {
      return (await this.appService.getQuestionManOne('question', id)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Get('answer/user/:id')
  async findAnswersbyUserId(@Param('id') id: string){
    try {
      return (await this.appService.getQuestionManOne('answer/user', id)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Delete('question/:id')
  async removeQ(@Param('id') id: string) {
    try {
      return (await this.appService.removeQuestionMan('question', id)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Get('keyword')
  async findAllK(){
    try {
      return (await this.appService.getQuestionManNoParams('keyword')).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Get('keyword/:word')
  async findOneK(@Param('word') word: string){
    try {
      return (await this.appService.getQuestionManOne('keyword', word)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Post('keyword')
  async attachKeyword
  (
    @Body('keyword') keyword: string,
    @Body('questionid') questionid: number
  ){
    console.log(keyword, questionid)
    try {
      return (await this.appService.attachKeyword(keyword, questionid)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Post('answer')
  async createA(@Body() createAnswerDto: CreateAnswerDto) {
    try {
      return (await this.appService.createA(createAnswerDto)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Get('answer')
  async findAllA() {
    try {
      return (await this.appService.getQuestionManNoParams('answer')).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Get('answer/:id')
  async findOneA(@Param('id') id: string) {
    try {
      return (await this.appService.getQuestionManOne('answer', id)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Delete('answer/:id')
  async removeA(@Param('id') id: string) {
    try {
      return (await this.appService.removeQuestionMan('answer', id)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Get('user/:id')
  async getOneUser(@Param('id') id: string){
    try {
      return (await this.appService.getQuestionManOne('user', id)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Get('keyword/word/:word')
  async getKeywordWord(@Param('word') word:string){
    try {
      return (await this.appService.getQuestionManOne('keyword/word', word)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }
}
