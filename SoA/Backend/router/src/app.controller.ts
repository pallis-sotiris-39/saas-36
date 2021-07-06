import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
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
    return (await this.appService.signIn(username, password)).data;
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
    return (await this.appService.signUp(first_name, last_name, birthday, email, username, password)).data;
  }

  @Get('whoami')
  async whoAmI(){}

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

  @Post('answer')
  async create (@Body() createAnswerDto: CreateAnswerDto) {
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

  @Post('keyword')
  async createK(@Body() createKeywordDto: CreateKeywordDto){
    return (await this.appService.attachKeyword(createKeywordDto)).data;
  }
}
