import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

const book = {
  title: 'The Great Gatsby',
  genre: 'Fiction',
  pageCount: 208,
  year: 1925,
  releaseDate: new Date('1925-04-10:00:00.000Z'),
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  author: {
    id: 1,
    firstName: '',
    lastName: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    books: [],
  },
};
describe('BookService', () => {
  let service: BookService;
  let bookRepository: Partial<Repository<Book>> = {
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
        BookService,
        { provide: 'BOOK_REPOSITORY', useValue: bookRepository },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    bookRepository = module.get('BOOK_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const createBookDto: CreateBookDto = {
      title: book.title,
      pageCount: book.pageCount,
      genre: book.genre,
      releaseDate: new Date(book.releaseDate),
      authorId: book.author.id,
    };
    bookRepository.create = jest.fn().mockReturnValue(book);
    bookRepository.save = jest.fn().mockReturnValue(book);

    const result = await service.create(createBookDto);
    expect(bookRepository.create).toHaveBeenCalledWith(createBookDto);
    expect(bookRepository.save).toHaveBeenCalledWith(book);
    expect(result).toEqual(book);
  });

  it('should update a book', async () => {
    const bookId = 1;
    const updateBookDto: UpdateBookDto = {
      title: 'Updated Title',
      pageCount: 300,
      genre: 'Updated Genre',
      releaseDate: new Date('2022-01-01'),
      authorId: 2,
    };
    const updatedBook: Book = {
      ...book,
      ...updateBookDto,
      updatedAt: new Date(),
    };
    bookRepository.findOne = jest.fn().mockResolvedValue(book);
    bookRepository.save = jest.fn().mockResolvedValue(updatedBook);

    const result = await service.update(bookId, updateBookDto);

    expect(bookRepository.findOne).toHaveBeenCalledWith(bookId);
    expect(result).toEqual(updatedBook);
  });
});
