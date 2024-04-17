import { CategoryEntity, ProductEntity } from 'database/entities';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
   Alert,
   Dimensions,
   FlatList,
   TouchableOpacity,
   View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { findCategoryByIdService } from 'services/categories-service';
import { styles } from 'styles/products.styles';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { theme } from 'constants/theme';
import { NoItems } from 'components/NoItems';
import { ProductDialog, ProductErrors } from 'components/ProductDialog';
import { Product } from 'components/Product';
import { ProductModel } from 'models/product-model';
import {
   createProductService,
   deleteProductByIdService,
   getProductsServiceByCategoryId,
   updateProductService,
} from 'services/products-services';
import { numberToBRL } from 'utils/number-to-brl';
import { DeleteDialog } from 'components/DeleteDialog';
import { usePreloader } from 'hooks/usePreloader';
import { ErrorProps } from 'types/error';

const productInitial = {
   name: '',
   quantity: null,
   price: null,
   categoryId: 0,
   id: 0,
};

export default function Products() {
   const [category, setCategory] = useState<CategoryEntity | null>(null);
   const { categoryId } = useLocalSearchParams();
   const [products, setProducts] = useState<ProductEntity[]>([]);

   const [product, setProduct] = useState<ProductModel>(productInitial);
   const [productErrors, setProductErrors] = useState<ProductErrors>({});

   const [isOpenAddProductDialog, setIsOpenAddProductDialog] =
      useState<boolean>(false);
   const [isOpenEditProductDialog, setIsOpenEditProductDialog] =
      useState<boolean>(false);
   const [isOpenDeleteProductDialog, setIsOpenDeleteProductDialog] =
      useState<boolean>(false);

   const productExists = products.find(
      (item) => item.name.toUpperCase() === product.name.toUpperCase() && item.id !== product.id && item.id
   );

   const PRODUCTS_TOTAL_PRICE = products.reduce(
      (accumulator: number, product: ProductEntity) => {
         return accumulator + product.price * product.quantity;
      },
      0,
   );

   const { openPreloader, closePreloader } = usePreloader();

   async function fetchCategory() {
      openPreloader();
      const categoryResponse = await findCategoryByIdService(
         Number(categoryId),
      );
      setCategory(categoryResponse);
   }

   async function fetchProducts() {
      openPreloader();
      const response = await getProductsServiceByCategoryId(Number(categoryId));
      setProducts(response);
      closePreloader();
   }

   function handleOpenDeleteProductDialog(product: ProductEntity) {
      const { id, name, price, quantity } = product;

      setProduct({
         id,
         name,
         price,
         quantity,
         categoryId: Number(categoryId),
      });

      setIsOpenDeleteProductDialog(true);
   }
   function handleCloseDeleteProductDialog() {
      setIsOpenDeleteProductDialog(false);
      setProduct(productInitial);
   }
   function handleOpenAddProductDialog() {
      setIsOpenAddProductDialog(true);
   }
   function handleOpenEditProductDialog(product: ProductEntity) {
      const { id, name, price, quantity } = product;

      setIsOpenEditProductDialog(true);

      setProduct({
         id,
         name,
         price,
         quantity,
         categoryId: Number(categoryId),
      });
   }

   function handleCloseAddProductDialog() {
      setIsOpenAddProductDialog(false);
      setProduct(productInitial);
      setProductErrors({});
   }
   function handleCloseEditProductDialog() {
      setIsOpenEditProductDialog(false);
      setProduct(productInitial);
      setProductErrors({});
   }

   function setInputError(prop: 'name' | 'quantity' | 'price') {
      setProductErrors((prevState) => ({
         ...prevState,
         [prop]: true,
      }));
   }

   function verifyInputErrors() {
      if (
         !product.name ||
         !product.quantity ||
         !product.price ||
         Number(product.quantity) === 0
      ) {
         if (!product.name) {
            setInputError('name');
         }

         if (!product.quantity || Number(product.quantity) === 0) {
            setInputError('quantity');
         }

         if (!product.price) {
            setInputError('price');
         }
         return true;
      }

      return false;
   }

   async function handleAddProduct() {
      if (verifyInputErrors()) {
         return;
      }

      if (productExists) {
         Alert.alert(
            'Produto já existente!',
            'Este produto já está cadastrado nesta categoria.',
         );
         return;
      }

      setIsOpenAddProductDialog(false);

      openPreloader();

      try {
         await createProductService({
            ...product,
            price: Number(product.price),
            quantity: Number(product.quantity),
            categoryId: Number(categoryId),
         });

         await fetchProducts();

         handleCloseAddProductDialog();
      } catch (err) {
         const error = err as ErrorProps;
         setIsOpenAddProductDialog(true);

         if (error.message && error.message === 'Product already exists!') {
            Alert.alert(
               'Produto já existente!',
               'Este produto já está cadastrado nesta categoria.',
            );
         } else {
            alert('Houve um erro ao editar seu produto!');
         }

         closePreloader();
      }
   }

   async function handleEditProduct() {
      if (verifyInputErrors()) {
         return;
      }

      if (productExists) {
         Alert.alert(
            'Produto já existente!',
            'Este produto já está cadastrado nesta categoria.',
         );
         return;
      }

      openPreloader();
      setIsOpenEditProductDialog(false);

      try {
         await updateProductService(
            product.id!,
            product.name,
            product.price!,
            product.quantity!,
         );
      } catch (err) {
         alert('Houve um erro ao editar seu produto!');
      } finally {
         handleCloseEditProductDialog();
         await fetchProducts();
      }
   }
   async function handleRemoveProduct() {
      handleCloseDeleteProductDialog();
      openPreloader();
      await deleteProductByIdService(product.id!);
      await fetchProducts();
   }

   useEffect(() => {
      fetchCategory();
      fetchProducts();
   }, []);

   return (
      <View style={styles.containerProducts}>
         <TouchableOpacity
            onPress={router.back}
            style={styles.iconBack}>
            <Ionicons
               name='arrow-back-sharp'
               size={30}
               color={theme.colors.primary}
            />
         </TouchableOpacity>
         <Text style={styles.categoryName}>{category?.name}</Text>
         <TouchableOpacity
            style={styles.buttonAddProduct}
            onPress={handleOpenAddProductDialog}>
            <Text style={styles.nameBtnAddProduct}>Adicionar produto</Text>
            <AntDesign
               name='plus'
               size={20}
               color='white'
            />
         </TouchableOpacity>

         <View style={{ width: '100%' }}>
            {products.length > 0 && (
               <View style={styles.charContainer}>
                  <View style={{ flexDirection: 'row', gap: 20 }}>
                     <Text style={styles.charText}>Qtd</Text>
                     <Text style={styles.charText}>Produto</Text>
                  </View>
                  <Text style={styles.charText}>Preço</Text>
               </View>
            )}
         </View>
         <FlatList
            data={products}
            style={{
               width: '100%',
               alignSelf: 'center',
            }}
            contentContainerStyle={{ gap: 10, alignItems: 'center' }}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
               <Product
                  product={item}
                  onEdit={() => handleOpenEditProductDialog(item)}
                  onRemove={() => handleOpenDeleteProductDialog(item)}
               />
            )}
            ListEmptyComponent={() => (
               <NoItems text='Não há produtos cadastrados' />
            )}
         />
         {products.length > 0 && (
            <Text style={styles.priceProductTotal}>
               Valor total:{' '}
               <Text style={[styles.priceProductTotal, { color: 'red' }]}>
                  {numberToBRL(PRODUCTS_TOTAL_PRICE)}
               </Text>
            </Text>
         )}

         <ProductDialog
            title='Adicionar item'
            isOpen={isOpenAddProductDialog}
            onClose={handleCloseAddProductDialog}
            product={product}
            setProduct={setProduct}
            onSubmit={handleAddProduct}
            errors={productErrors}
            setErrors={setProductErrors}
         />
         <ProductDialog
            title='Editar item'
            isOpen={isOpenEditProductDialog}
            product={product}
            setProduct={setProduct}
            onClose={handleCloseEditProductDialog}
            onSubmit={handleEditProduct}
            errors={productErrors}
            setErrors={setProductErrors}
         />
         <DeleteDialog
            isOpen={isOpenDeleteProductDialog}
            itemName={product.name}
            onRemove={handleRemoveProduct}
            onClose={handleCloseDeleteProductDialog}
         />
      </View>
   );
}
