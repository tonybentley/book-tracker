import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

const book = {
  id: 1,
  title: 'The Great Gatsby',
  genre: 'Fiction',
  pageCount: 208,
  releaseDate: new Date('1925-04-10:00:00.000Z'),
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: 1,
  author: {
    id: 1,
    firstName: '',
    lastName: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    books: [],
  },
};
const bookId = book.id.toString();

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            remove: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new book', async () => {
    const createBookDto: CreateBookDto = book;
    const createdBook = Object.assign(book, createBookDto);
    jest.spyOn(service, 'create').mockResolvedValue(book);

    const result = await controller.create(createBookDto);

    expect(result).toEqual(createdBook);
  });

  it('should return all books', async () => {
    const books = [book];
    jest.spyOn(service, 'findAll').mockResolvedValue(books);

    const result = await controller.findAll(null, null);

    expect(result).toEqual(books);
  });

  it('should return a book by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(book);
    const result = await controller.findOne(bookId);
    expect(result).toEqual(book);
  });

  it('should update a book', async () => {
    const updateBookDto: UpdateBookDto = {
      title: 'Updated Book',
    };
    const updatedBook = Object.assign(book, updateBookDto);
    jest.spyOn(service, 'update').mockResolvedValue(updatedBook);

    const result = await controller.update(bookId, updateBookDto);

    expect(result).toEqual(updatedBook);
  });

  it('should remove a book', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(book);
    const result = await controller.remove(bookId);

    expect(result).toEqual(book);
  });
});
