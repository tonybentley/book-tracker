import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiQuery } from '@nestjs/swagger';
import { PaginationOptions } from '../interfaces/pagination.interface';
import { Query } from '@nestjs/common';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

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
  @Get()
  findAll(
    @Query('page') page: number | null,
    @Query('limit') limit: number | null,
  ) {
    const paginationOptions: PaginationOptions = {
      page: page || 1,
      limit: limit || 10,
    };
    return this.authorService.findAll(paginationOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
