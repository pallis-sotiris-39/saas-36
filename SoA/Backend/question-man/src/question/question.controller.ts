import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Header, Req, NotFoundException, BadRequestException } from "@nestjs/common";
import { Request, Response } from 'express';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuotesService } from "../services/quotes/quotes.service";

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService, private quotesService: QuotesService) {}

  async authenticate(fun, req ,res){
    try{
      let token = req.headers.authorization.split(" ")[1];
      this.quotesService.getWhoAmI(token).then(async r => {
        console.log("LALALALALLA")
        let sth = await fun;
        res.status(200).send(sth);
      });
    }catch (e) {
      res.status(400).send(e.message)
    }
  }

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    return await this.authenticate(this.questionService.findAll(), req, res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    return await this.authenticate(this.questionService.findOne(+id), req, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
