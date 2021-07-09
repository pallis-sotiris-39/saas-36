import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete, HttpException, HttpStatus
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { CreateQuestionDto } from "./dto/create-question.dto";

@Controller("question")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {
  }

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    try {
      return await this.questionService.create(createQuestionDto);
    } catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.questionService.findAll();
    } catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
  }

  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    try {
      return await this.questionService.findOne(+id);
    } catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
    }
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    try {
      return this.questionService.remove(+id);
    } catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
    }
  }
}
