import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post} from "@nestjs/common";
import { AppService } from './app.service';
import { CreateQuestionDto } from "./create-question.dto";
import { CreateAnswerDto } from "./create-answer.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('question')
  async createQ(@Body() createQuestionDto: CreateQuestionDto) {
    return (await this.appService.createQ(createQuestionDto).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })).data;
  }

  @Get('question')
  async findAllQ() {
    return (await this.appService.getQuestionManNoParams('question').catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })).data;
  }

  @Get('question/:id')
  async findOneQ(@Param('id') id: string) {
    return (await this.appService.getQuestionManOne('question', id).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })).data;
  }

  @Delete('question/:id')
  async removeQ(@Param('id') id: string) {
    return (await this.appService.removeQuestionMan('question', id).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })).data;
  }

  @Get('keyword')
  async findAllK(){
    return (await this.appService.getQuestionManNoParams('keyword').catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })).data;
  }

  @Get('keyword/:id')
  async findOneK(@Param('id') id: string){
    return (await this.appService.getQuestionManOne('keyword', id).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })).data;
  }

  @Post('keyword')
  async attachKeyword
  (
    @Body('keyword') keyword: string,
    @Body('questionid') questionid: number
  ){
    console.log(keyword, questionid)
    return (await this.appService.attachKeyword(keyword, questionid).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })).data;
  }

  @Post('answer')
  async createA(@Body() createAnswerDto: CreateAnswerDto) {
    return (await this.appService.createA(createAnswerDto).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })).data;
  }

  @Get('answer')
  async findAllA() {
    return (await this.appService.getQuestionManNoParams('answer').catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })).data;
  }

  @Get('answer/:id')
  async findOneA(@Param('id') id: string) {
    return (await this.appService.getQuestionManOne('answer', id).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })).data;
  }

  @Delete('answer/:id')
  async removeA(@Param('id') id: string) {
    return (await this.appService.removeQuestionMan('answer', id).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })).data;
  }

  @Get('user/:id')
  async getOneUser(@Param('id') id: string){
    return (await this.appService.getQuestionManOne('user', id).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })).data;
  }

  @Get('keyword/word/:word')
  async getKeywordWord(@Param('word') word:string){
    return (await this.appService.getQuestionManOne('keyword/word', word).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })).data;
  }
}
