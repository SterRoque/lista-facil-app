import { categoryRepository } from 'repositories'


export async function deleteCategoryByIdService(id: number): Promise<void> {
  await categoryRepository.delete({
    id
  })
}