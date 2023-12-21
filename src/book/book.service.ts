import { Injectable, Inject } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { PaginationOptions } from '../interfaces/pagination.interface';
@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(book);
  }

  async findAll(paginationOptions: PaginationOptions) {
    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    return await this.bookRepository.find({
      skip,
      take: paginationOptions.limit,
    });
  }

  async findOne(id: number) {
    return await this.bookRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({
      where: {
        id,
      },
    });
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    const updatedBook = Object.assign(book, updateBookDto);
    return await this.bookRepository.save(updatedBook);
  }

  async remove(id: number) {
    const book = await this.bookRepository.findOne({
      where: {
        id,
      },
    });
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    return await this.bookRepository.remove(book);
  }
}
