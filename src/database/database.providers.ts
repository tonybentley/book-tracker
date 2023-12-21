import { DataSource } from 'typeorm';
import { Book } from '../book/entities/book.entity';
import { Author } from '../author/entities/author.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'docker',
        password: 'password',
        database: 'booktracker',
        entities: [Book, Author],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
