import { dataSource } from 'database'
import { ProductEntity } from 'database/entities'

export const productRepository = dataSource.getRepository(ProductEntity)
