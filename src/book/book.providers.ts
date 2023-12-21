import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';

export const BookProviders = [
  {
    provide: 'BOOK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Book),
    inject: ['DATA_SOURCE'],
  },
];
