import { ProductEntity } from 'database/entities'
import { productRepository } from 'repositories'

export async function getProductsServiceByCategoryId(categoryId: number): Promise<ProductEntity[]> {
  const products = await productRepository.find({
    where: {
      category: {
        id: categoryId
      }
    }
  })
  
  return products
}
  