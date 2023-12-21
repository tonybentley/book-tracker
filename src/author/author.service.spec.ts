import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PaginationOptions } from '../interfaces/pagination.interface';

describe('AuthorService', () => {
  let service: AuthorService;
  let authorRepository: Partial<Repository<Author>> = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        { provide: 'AUTHOR_REPOSITORY', useValue: authorRepository },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    authorRepository = module.get('AUTHOR_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new author', async () => {
    const createAuthorDto: CreateAuthorDto = {
      firstName: 'John',
      lastName: 'Doe',
    };

    const expectedResult: Author = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createAuthorDto,
      books: [],
    };

    jest.spyOn(authorRepository, 'create').mockReturnValue(expectedResult);
    jest.spyOn(authorRepository, 'save').mockResolvedValue(expectedResult);

    const result = await service.create(createAuthorDto);

    expect(result).toEqual(expectedResult);
    expect(authorRepository.create).toHaveBeenCalledWith(createAuthorDto);
    expect(authorRepository.save).toHaveBeenCalledWith(expectedResult);
  });

  it('should find all authors with pagination options', async () => {
    const paginationOptions: PaginationOptions = {
      page: 1,
      limit: 10,
    };

    const expectedResult: Author[] = [];

    jest.spyOn(authorRepository, 'find').mockResolvedValue(expectedResult);

    const result = await service.findAll(paginationOptions);

    expect(result).toEqual(expectedResult);

    // exposing the inner workings of the repository
    expect(authorRepository.find).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
    });
  });

  it('should update an existing author', async () => {
    const authorId = 1;
    const updateAuthorDto: UpdateAuthorDto = {
      firstName: 'Jane',
      lastName: 'Smith',
    };

    const existingAuthor: Author = {
      id: authorId,
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
      books: [],
    };

    const updatedAuthor: Author = {
      id: authorId,
      firstName: updateAuthorDto.firstName,
      lastName: updateAuthorDto.lastName,
      createdAt: existingAuthor.createdAt,
      updatedAt: new Date(),
      books: existingAuthor.books,
    };

    jest.spyOn(authorRepository, 'findOne').mockResolvedValue(existingAuthor);
    jest.spyOn(authorRepository, 'save').mockResolvedValue(updatedAuthor);

    const result = await service.update(authorId, updateAuthorDto);

    expect(authorRepository.save).toHaveBeenCalledWith(updatedAuthor);
    expect(result).toEqual(updatedAuthor);
  });
});
