import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}
