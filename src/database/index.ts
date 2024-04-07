import { DataSource } from 'typeorm';
import { CategoryEntity, ProductEntity } from './entities';

export const dataSource = new DataSource({
   database: 'database.db',
   entities: [CategoryEntity, ProductEntity],
   type: 'expo',
   driver: require('expo-sqlite'),
   synchronize: true,
});
