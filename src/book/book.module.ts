import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DatabaseModule } from '../database/database.module';
import { BookProviders } from './book.providers';

@Module({
  controllers: [BookController],
  providers: [BookService, ...BookProviders],
  imports: [DatabaseModule],
})
export class BookModule {}
