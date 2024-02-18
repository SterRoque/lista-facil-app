import { productRepository } from 'repositories'

export async function deleteProductByIdService(id: number): Promise<void> {
  await productRepository.delete({
    id
  })
}