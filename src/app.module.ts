import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [DatabaseModule, BookModule, AuthorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
