import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user/user.service";
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { KeywordModule } from './keyword/keyword.module';

@Module({
  imports: [QuestionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": process.env.DB_HOST,
      "port": parseInt(process.env.DB_PORT, 10) || 5432,
      "username": process.env.DB_USER,
      "password": process.env.DB_PASS,
      "database": "saas-36",
      "entities": [
        "dist/**/*.entity{.ts,.js}"
      ]
    }),
    AnswerModule,
    UserModule,
    HttpModule,
    KeywordModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
