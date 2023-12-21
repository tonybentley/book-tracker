import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

const author = {
  firstName: 'F. Scott',
  lastName: 'Fitzgerald',
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  books: [],
};

describe('AuthorController', () => {
  let controller: AuthorController;
  let authorService: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
    authorService = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authorService.create with the correct parameters', () => {
    const createAuthorDto: CreateAuthorDto = author;

    controller.create(createAuthorDto);

    expect(authorService.create).toHaveBeenCalledWith(createAuthorDto);
  });

  it('should call authorService.findAll and return the result', () => {
    const expectedResult = [
      /* expected result array */
    ];
    (authorService.findAll as jest.Mock).mockReturnValue(expectedResult);

    const result = controller.findAll(1, 1);

    expect(authorService.findAll).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  it('should call authorService.findOne with the correct parameter and return the result', () => {
    const authorId = '123';
    const authorIdNumber = Number(authorId);
    const expectedResult = {
      /* expected result object */
    };
    (authorService.findOne as jest.Mock).mockReturnValue(expectedResult);

    const result = controller.findOne(authorId);

    expect(authorService.findOne).toHaveBeenCalledWith(authorIdNumber);
    expect(result).toEqual(expectedResult);
  });

  it('should call authorService.update with the correct parameters', () => {
    const authorId = '123';
    const authorIdNumber = Number(authorId);
    const updateAuthorDto: UpdateAuthorDto = {
      /* update author DTO data */
    };

    controller.update(authorId, updateAuthorDto);

    expect(authorService.update).toHaveBeenCalledWith(
      authorIdNumber,
      updateAuthorDto,
    );
  });

  it('should call authorService.remove with the correct parameter', () => {
    const authorId = '123';
    const authorIdNumber = Number(authorId);
    controller.remove(authorId);
    expect(authorService.remove).toHaveBeenCalledWith(authorIdNumber);
  });
});
