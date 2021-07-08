import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete, HttpException, HttpStatus
} from "@nestjs/common";
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionService.create(createQuestionDto).catch(err => {
      throw new HttpException({
        message: err.message,

      }, HttpStatus.BAD_REQUEST)
    });
  }

  @Get()
  async findAll() {
    return await this.questionService.findAll().catch(err => {
      throw new HttpException({
        message: err.message,

      }, err.statusCode)
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.questionService.findOne(+id).catch(err => {
      throw new HttpException({
        message: err.message,

      }, err.statusCode)
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id).catch(err => {
      throw new HttpException({
        message: err.message,

      }, err.statusCode)
    });
  }
}
