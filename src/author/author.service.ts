import { Injectable, Inject } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { FindManyOptions } from 'typeorm';
import { PaginationOptions } from '../interfaces/pagination.interface';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(author);
  }

  async findAll(paginationOptions: PaginationOptions) {
    const { page, limit } = paginationOptions;
    const skip = (page - 1) * limit;
    const take = limit;

    const options: FindManyOptions<Author> = {
      skip,
      take,
    };

    return await this.authorRepository.find(options);
  }

  async findOne(id: number) {
    return await this.authorRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorRepository.findOne({
      where: {
        id,
      },
    });
    if (!author) {
      throw new Error(`Author with id ${id} not found`);
    }
    const updatedAuthor = Object.assign(author, updateAuthorDto);
    return await this.authorRepository.save(updatedAuthor);
  }

  async remove(id: number) {
    const author = await this.authorRepository.findOne({
      where: {
        id,
      },
    });
    if (!author) {
      throw new Error(`Author with id ${id} not found`);
    }
    return await this.authorRepository.remove(author);
  }
}
