import { CategoryEntity } from 'database/entities'
import { categoryRepository } from 'repositories'

export async function findCategoryByIdService(id: number): Promise<CategoryEntity | null> {
  const category = await categoryRepository.findOne({
    where: {
      id
    }
  })
  
  return category
}