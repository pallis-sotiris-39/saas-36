import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnswerModule } from './answer/answer.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [QuestionModule,
  TypeOrmModule.forRoot(),
  AnswerModule,
  UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
