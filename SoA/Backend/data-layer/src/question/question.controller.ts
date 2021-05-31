import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Req
} from "@nestjs/common";
import { Request, Response } from 'express';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    return await this.questionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    return await this.questionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
