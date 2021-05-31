import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user/user.service";
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [QuestionModule,
    TypeOrmModule.forRoot(),
    AnswerModule,
    UserModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
