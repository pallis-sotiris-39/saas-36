import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  private readonly questions: Question[] = [];

  create(createQuestionDto: CreateQuestionDto) {
    const id = this.questions.length + 1;
    const quest = { id: id, ...createQuestionDto };
    this.questions.push(quest);
    return quest;
  }

  findAll() {
    return this.questions;
  }

  findOne(id: number) {
    const quest = this.questions.find((quest) => quest.id == id);
    if (!quest) throw new NotFoundException('Quiz ${id} not found.');
    return quest;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
