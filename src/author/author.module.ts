import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorProviders } from './author.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorController],
  providers: [AuthorService, ...AuthorProviders],
  exports: [],
})
export class AuthorModule {}
