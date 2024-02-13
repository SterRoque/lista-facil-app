import { dataSource } from 'database'
import { ProductEntity } from 'database/entities'
import { ProductModel } from 'models/product-model'
import { categoryRepository, productRepository } from 'repositories'

export async function createProductService({
  name,
  price = 0,
  quantity = 1,
  categoryId
}: ProductModel): Promise<ProductEntity> {
  const productExists = await productRepository.findOne({ where: { name } })

  if (productExists) {
    throw new Error('Product already exists!')
  }

  const category = await categoryRepository.findOne({
    where: {
      id: categoryId
    }
  })

  if (!category) {
    throw new Error('Category not found!')
  }

  if (price < 1) {
    throw new Error('Price should be greater that 1')
  }

  const product = new ProductEntity()

  product.name = name
  product.price = price
  product.quantity = quantity
  product.category = category!

  await dataSource.manager.save(category)

  return product
}


export async function getProductsService(): Promise<ProductEntity[]> {
  const products = await productRepository.find()

  return products
}


export async function deleteProductByIdService(id: number): Promise<void> {
  await productRepository.delete({
    id
  })
}


export async function updateProductService(id: number, name: string, price: number = 0): Promise<void> {
  await productRepository.update(id, {
    name,
    price
  })
}
