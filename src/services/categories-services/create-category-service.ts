import { dataSource } from 'database'
import { CategoryEntity } from 'database/entities'
import { categoryRepository } from 'repositories'

export async function createCategoryService(name: string): Promise<void> {
  const categoryExists = await categoryRepository.findOne({ where: { name } })
  
  if (categoryExists) {
    throw new Error('Category already exists!')
  }
  
  const category = new CategoryEntity()
  
  category.name = name
  
  await dataSource.manager.save(category)
}