import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete
} from "@nestjs/common";
import { Request, Response } from 'express';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionService.create(createQuestionDto);
  }

  @Post('attach')
  async attach(
    @Body('keywords') keywords: string[],
    @Body('id') id: number
  ){
    return await this.questionService.attach(keywords, id);
  }
  @Get()
  async findAll() {
    return await this.questionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.questionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
