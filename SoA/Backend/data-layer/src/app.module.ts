import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user/user.service";
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [QuestionModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": process.env.DB_HOST,
      "port": parseInt(process.env.DB_PORT, 10) || 5432,
      "username": "postgres",
      "password": "password",
      "database": "saas-36",
      "entities": [
        "dist/**/*.entity{.ts,.js}"
      ]
    }),
    AnswerModule,
    UserModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
