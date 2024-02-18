import { categoryRepository } from 'repositories'

export async function updateCategoryService(id: number, name: string): Promise<void> {
  await categoryRepository.update(id, {
    name
  })
}
  