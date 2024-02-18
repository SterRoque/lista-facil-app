import { CategoryEntity } from 'database/entities'
import { categoryRepository } from 'repositories'

export async function getCategoriesService(): Promise<CategoryEntity[]> {
  const categories = await categoryRepository.find()
  
  return categories
}
  