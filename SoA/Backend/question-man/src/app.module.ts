import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnswerModule } from './answer/answer.module';
import { UserModule } from './user/user.module';
import { KeywordModule } from './keyword/keyword.module';
import { QuotesService } from './services/quotes/quotes.service';

@Module({
  imports: [QuestionModule,
  TypeOrmModule.forRoot(),
  AnswerModule,
  UserModule,
  KeywordModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService, QuotesService],
})
export class AppModule {}
