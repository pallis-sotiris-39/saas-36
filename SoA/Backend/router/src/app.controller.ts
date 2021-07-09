import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards
} from "@nestjs/common";
import { AppService } from './app.service';
import { CreateAnswerDto } from "./create-answer.dto";
import { CreateQuestionDto } from "./create-question.dto";
import { CreateKeywordDto } from "./create-keyword.dto";
import { AuthGuard } from "./auth.guard";

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
  async whoAmI(@Headers('Authorization') token: string)
  {
    return (await this.appService.whoami(token).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.UNAUTHORIZED);
    })).data;
  }

  @UseGuards(AuthGuard)
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
      return (await this.appService.getQuestionManNoParams("question")).data;
    } catch (e) {
      if (!e.response.status){
        console.log(e);
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @Get('question/:id')
  async findOneQ(@Param('id') id: string) {
    try {
      return (await this.appService.getQuestionManOne("question", id)).data;
    }catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @UseGuards(AuthGuard)
  @Delete('question/:id')
  async removeQ(@Param('id') id: string) {
    try {
      return (await this.appService.removeQuestionMan("question", id)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @UseGuards(AuthGuard)
  @Post('answer')
  async create (@Body() createAnswerDto: CreateAnswerDto) {
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
      return (await this.appService.getQuestionManNoParams("answer")).data;
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
      return (await this.appService.getQuestionManOne("answer", id)).data;
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
      return (await this.appService.getQuestionManOne("answer/user", id)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @UseGuards(AuthGuard)
  @Delete('answer/:id')
  async removeA(@Param('id') id: string) {
    try {
      return (await this.appService.removeQuestionMan("answer", id)).data;
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
      return (await this.appService.getQuestionManNoParams("keyword")).data;
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
      return (await this.appService.getQuestionManOne("keyword", word)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }

  @UseGuards(AuthGuard)
  @Post('keyword')
  async createK(@Body() createKeywordDto: CreateKeywordDto){
    try {
      return (await this.appService.attachKeyword(createKeywordDto)).data;
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
      return (await this.appService.getQuestionManOne("user", id)).data;
    } catch (e) {
      if (!e.response.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }
}
