import { DataSource } from 'typeorm';
import { Author } from './entities/author.entity';

export const AuthorProviders = [
  {
    provide: 'AUTHOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Author),
    inject: ['DATA_SOURCE'],
  },
];
