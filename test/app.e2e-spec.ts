import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const author = {
  firstName: 'F. Scott',
  lastName: 'Fitzgerald',
};

const book = {
  title: 'The Great Gatsby',
  releaseDate: '1925-04-10',
  pageCount: 208,
  genre: 'Fiction',
  authorId: 0,
};

describe('CRUD on book and author', () => {
  let app: INestApplication;
  let authorRepository;
  let bookRepository;
  let db;

  afterAll(async () => {
    //remove everything from the database, regardless if pass/fail
    await authorRepository.delete({});
    await bookRepository.delete({});
    //close db connection (or the process will hang)
    await db.close();
    //close the app
    await app.close();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(console);

    authorRepository = moduleFixture.get('AUTHOR_REPOSITORY');
    bookRepository = moduleFixture.get('BOOK_REPOSITORY');
    db = moduleFixture.get('DATA_SOURCE');

    await app.init();
  });

  it('should CRUD on author and book', async () => {
    try {
      //create author for book
      const createdAuthor = await request(app.getHttpServer())
        .post('/author')
        .send(author)
        .expect(201);

      const authorId = createdAuthor.body.id;

      const bookRecord = Object.assign(book, {
        authorId,
        releaseDate: new Date(book.releaseDate),
      });

      //create book with author
      const createdBook = await request(app.getHttpServer())
        .post('/book')
        .send(bookRecord)
        .expect(201);

      const bookId = createdBook.body.id;

      //get all books
      const allBooks = await request(app.getHttpServer())
        .get('/book?limit=10&offset=0')
        .send(bookRecord)
        .expect(200);

      //get all authors
      const allAuthors = await request(app.getHttpServer())
        .get('/author?limit=10&offset=0')
        .send(bookRecord)
        .expect(200);

      // update author
      await request(app.getHttpServer())
        .patch(`/author/${authorId}`)
        .send({
          lastName: 'Fitzgeralds',
        })
        .expect(200);

      //update book
      await request(app.getHttpServer())
        .patch(`/book/${bookId}`)
        .send({
          title: 'The Grate Gatsby',
        })
        .expect(200);

      const bookById = await request(app.getHttpServer())
        .get(`/book/${bookId}`)
        .expect(200);

      const authorById = await request(app.getHttpServer())
        .get(`/author/${authorId}`)
        .expect(200);

      //delete book
      await request(app.getHttpServer()).delete(`/book/${bookId}`).expect(200);

      //delete author
      await request(app.getHttpServer())
        .delete(`/author/${authorId}`)
        .expect(200);

      expect(allBooks.body.length).toBe(1);
      expect(allAuthors.body.length).toBe(1);
      expect(bookById.body.title).toBe('The Grate Gatsby');
      expect(authorById.body.lastName).toBe('Fitzgeralds');
    } catch (e) {
      throw e;
    }
  });
});
