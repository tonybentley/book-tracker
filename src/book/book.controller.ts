import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiQuery } from '@nestjs/swagger';
import { PaginationOptions } from '../interfaces/pagination.interface';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    type: String,
    description: 'Optional start number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: String,
    description: 'Optional limit of pages',
    required: false,
  })
  findAll(
    @Query('page') page: number | null,
    @Query('limit') limit: number | null,
  ) {
    const paginationOptions: PaginationOptions = {
      page: page || 1,
      limit: limit || 10,
    };
    return this.bookService.findAll(paginationOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
