import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { AppService } from './app.service';
import { CreateAnswerDto } from "./create-answer.dto";
import { CreateQuestionDto } from "./create-question.dto";
import { CreateKeywordDto } from "./create-keyword.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signin')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    return (await this.appService.signIn(username, password).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.UNAUTHORIZED);
    }).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.UNAUTHORIZED);
    })).data;
  }

  @Post('signup')
  async signUp(
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('birthday') birthday: string,
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string
  ){
    return (await this.appService.signUp(first_name, last_name, birthday, email, username, password).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.UNAUTHORIZED);
    })).data;
  }

  @Get('whoami')
  async whoAmI(){}

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

  @Post('answer')
  async create (@Body() createAnswerDto: CreateAnswerDto) {
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
  async createK(@Body() createKeywordDto: CreateKeywordDto){
    return (await this.appService.attachKeyword(createKeywordDto).catch(err => {
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
