import { dataSource } from 'database'
import { CategoryEntity } from 'database/entities'
import { categoryRepository } from 'repositories'

export async function createCategoryService(name: string): Promise<CategoryEntity> {
  const categoryExists = await categoryRepository.findOne({ where: { name } })

  if (categoryExists) {
    throw new Error('Category already exists!')
  }

  const category = new CategoryEntity()

  category.name = name

  await dataSource.manager.save(category)

  return category
}


export async function getCategoriesService(): Promise<CategoryEntity[]> {
  const categories = await categoryRepository.find()

  return categories
}


export async function findCategoryByIdService(id: number): Promise<CategoryEntity | null> {
  const category = await categoryRepository.findOne({
    where: {
      id
    }
  })

  return category
}


export async function deleteCategoryByIdService(id: number): Promise<void> {
  await categoryRepository.delete({
    id
  })
}


export async function updateCategoryService(id: number, name: string): Promise<void> {
  await categoryRepository.update(id, {
    name
  })
}
