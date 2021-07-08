import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { AppService } from './app.service';
import { CreateQuestionDto } from "./create-question.dto";
import { CreateAnswerDto } from "./create-answer.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('question')
  async createQ(@Body() createQuestionDto: CreateQuestionDto) {
    return (await this.appService.createQ(createQuestionDto)).data;
  }

  @Get('question')
  async findAllQ() {
    return (await this.appService.getQuestionManNoParams('question')).data;
  }

  @Get('question/:id')
  async findOneQ(@Param('id') id: string) {
    return (await this.appService.getQuestionManOne('question', id)).data;
  }

  @Delete('question/:id')
  async removeQ(@Param('id') id: string) {
    return (await this.appService.removeQuestionMan('question', id)).data;
  }

  @Get('keyword')
  async findAllK(){
    return (await this.appService.getQuestionManNoParams('keyword')).data;
  }

  @Get('keyword/:id')
  async findOneK(@Param('id') id: string){
    return (await this.appService.getQuestionManOne('keyword', id)).data;
  }

  @Post('keyword')
  async attachKeyword
  (
    @Body('keyword') keyword: string,
    @Body('questionid') questionid: number
  ){
    console.log(keyword, questionid)
    return (await this.appService.attachKeyword(keyword, questionid)).data;
  }

  @Post('answer')
  async createA(@Body() createAnswerDto: CreateAnswerDto) {
    return (await this.appService.createA(createAnswerDto)).data;
  }

  @Get('answer')
  async findAllA() {
    return (await this.appService.getQuestionManNoParams('answer')).data;
  }

  @Get('answer/:id')
  async findOneA(@Param('id') id: string) {
    return (await this.appService.getQuestionManOne('answer', id)).data;
  }

  @Delete('answer/:id')
  async removeA(@Param('id') id: string) {
    return (await this.appService.removeQuestionMan('answer', id)).data;
  }

  @Get('user/:id')
  async getOneUser(@Param('id') id: string){
    return (await this.appService.getQuestionManOne('user', id)).data;
  }

  @Get('keyword/word/:word')
  async getKeywordWord(@Param('word') word:string){
    return (await this.appService.getQuestionManOne('keyword/word', word)).data;
  }
}
