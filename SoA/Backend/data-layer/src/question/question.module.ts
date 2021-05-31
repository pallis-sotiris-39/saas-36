import { HttpModule,  Module } from "@nestjs/common";
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { UserService } from "../user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([Question]), HttpModule],
  controllers: [QuestionController],
  providers: [QuestionService, UserService],
})
export class QuestionModule {}
