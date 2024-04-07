import { dataSource } from 'database';
import { CategoryEntity } from 'database/entities';
import { categoryRepository } from 'repositories';
import {
   deleteProductByIdService,
   getProductsServiceByCategoryId,
} from './products-services';

export async function createCategoryService(
   name: string,
): Promise<CategoryEntity> {
   const categoryExists = await categoryRepository.findOne({ where: { name } });

   if (categoryExists) {
      throw new Error('Category already exists!');
   }

   const category = new CategoryEntity();

   category.name = name;

   await dataSource.manager.save(category);

   return category;
}

export async function getCategoriesService(): Promise<CategoryEntity[]> {
   const categories = await categoryRepository.find();

   return categories;
}

export async function findCategoryByIdService(
   id: number,
): Promise<CategoryEntity | null> {
   const category = await categoryRepository.findOne({
      where: {
         id,
      },
   });

   return category;
}

export async function deleteCategoryByIdService(id: number): Promise<void> {
   const categoryExists = await findCategoryByIdService(id);

   if (!categoryExists) {
      throw new Error('Category not found!');
   }

   const products = await getProductsServiceByCategoryId(id);

   if (products.length > 0) {
      await Promise.all(
         products.map(async (product) => {
            if (product.id) {
               await deleteProductByIdService(product.id);
            }
         }),
      );
   }

   await categoryRepository.delete({
      id,
   });
}

export async function updateCategoryService(
   id: number,
   name: string,
): Promise<void> {
   await categoryRepository.update(id, {
      name,
   });
}
