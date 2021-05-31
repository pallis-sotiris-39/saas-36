import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signin')
  async signIn(@Body() body: string) {
    return this.appService.signIn(body);
  }

  @Post('question')
  create() {
    return null;
  }

  @Get('question')
  async findAllQ() {
    return await this.appService.getQuestionManNoParams('question');
  }

  @Get('question/:id')
  async findOneQ(@Param('id') id: string) {
    return null;
  }

  @Delete('question/:id')
  removeQ(@Param('id') id: string) {
    return null;
  }

  @Post('answer')
  createQ() {
    return null;
  }

  @Get('answer')
  findAllA() {
    return this.appService.getQuestionManNoParams('answer');
  }

  @Get('answer/:id')
  findOneA(@Param('id') id: string) {
    return null;
  }

  @Delete('answer/:id')
  removeA(@Param('id') id: string) {
    return null;
  }
}
