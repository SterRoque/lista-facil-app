import { dataSource } from 'database'
import { CategoryEntity } from 'database/entities'

export const categoryRepository = dataSource.getRepository(CategoryEntity)
