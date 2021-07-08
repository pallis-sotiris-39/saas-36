import { HttpModule, Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/question/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), HttpModule],
  controllers: [KeywordController],
  providers: [KeywordService]
})
export class KeywordModule {}
