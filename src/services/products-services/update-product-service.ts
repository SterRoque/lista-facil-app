import { productRepository } from 'repositories'

export async function updateProductService(id: number, name: string, price: number = 0): Promise<void> {
  await productRepository.update(id, {
    name,
    price
  })
}