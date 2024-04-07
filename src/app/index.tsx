import { FlatList, View } from 'react-native';
import Logo from '../assets/icons/logo.svg';
import { styles } from '../styles/home.styles';
import { InputAdd } from '../components/InputAdd';
import { NoItems } from '../components/NoItems';
import { Category } from 'components/Category';
import { useEffect, useState } from 'react';
import { dataSource } from 'database';
import { ActivityIndicator, Text } from 'react-native-paper';
import {
   createCategoryService,
   deleteCategoryByIdService,
   getCategoriesService,
   updateCategoryService,
} from 'services/categories-service';
import { CategoryEntity } from 'database/entities';
import { EditCategoryDialog } from 'components/EditCategoryDialog';
import { CategoryModel } from 'models/category-model';
import { DeleteDialog } from 'components/DeleteDialog';
import { usePreloader } from 'hooks/usePreloader';

export default function Home() {
   const [isConnectingToDB, setIsConnectingToDB] = useState<boolean>(false);
   const [inputText, setInputText] = useState<string>('');
   const [hasInputTextError, setHasInputTextError] = useState<boolean>(false);
   const [categories, setCategories] = useState<CategoryEntity[]>([]);
   const [category, setCategory] = useState<CategoryModel>({ name: '' });
   const [isOpenEditDialog, setIsOpenEditDialog] = useState<boolean>(false);
   const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);

   const { openPreloader, closePreloader } = usePreloader();

   async function fetchCategories() {
      openPreloader();
      const response = await getCategoriesService();
      setCategories(response);
      closePreloader();
   }

   function handleOpenEditDialog(item: CategoryModel) {
      setCategory(item);
      setIsOpenEditDialog(true);
   }

   async function handleAddCategory() {
      if (!inputText) {
         setHasInputTextError(true);
         return;
      }

      openPreloader();
      await createCategoryService(inputText);
      await fetchCategories();
      setInputText('');
   }

   function handleCloseEditDialog() {
      setIsOpenEditDialog(false);
   }

   function handleOpenDeleteDialog(item: CategoryModel) {
      setCategory(item);
      setIsOpenDeleteDialog(true);
   }

   function handleCloseDeleteDialog() {
      setIsOpenDeleteDialog(false);
   }

   async function handleDeleteCategory() {
      handleCloseDeleteDialog();
      openPreloader();
      await deleteCategoryByIdService(category.id!);
      await fetchCategories();
   }

   async function handleSubmitEditDialog() {
      handleCloseEditDialog();
      openPreloader();
      await updateCategoryService(category.id!, category.name);
      await fetchCategories();
   }

   useEffect(() => {
      const connectToDB = async () => {
         if (!dataSource.isInitialized) {
            try {
               setIsConnectingToDB(true);
               await dataSource.initialize();
               setIsConnectingToDB(false);
            } catch (e) {
               console.error(e);
            }
         }
      };

      connectToDB().then(() => fetchCategories());
   }, []);

   if (isConnectingToDB) {
      return (
         <View style={styles.body}>
            <ActivityIndicator />
         </View>
      );
   }

   return (
      <View style={styles.body}>
         <Logo />
         <InputAdd
            onChangeText={(text) => setInputText(text)}
            value={inputText}
            onAdd={handleAddCategory}
            hasError={hasInputTextError}
            setHasError={setHasInputTextError}
         />
         <FlatList
            data={categories}
            style={{ width: '100%', marginTop: 45 }}
            contentContainerStyle={{ gap: 10, alignItems: 'center' }}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
               <Category
                  id={item.id}
                  title={item.name}
                  onEdit={() => handleOpenEditDialog(item)}
                  onRemove={() => handleOpenDeleteDialog(item)}
               />
            )}
            ListEmptyComponent={() => (
               <NoItems text='Não há listas cadastradas' />
            )}
         />
         <DeleteDialog
            itemName={category.name}
            isOpen={isOpenDeleteDialog}
            onClose={handleCloseDeleteDialog}
            onRemove={handleDeleteCategory}
         />
         <EditCategoryDialog
            isOpen={isOpenEditDialog}
            onClose={handleCloseEditDialog}
            value={category.name}
            onChangeText={(text) =>
               setCategory((prev) => ({ ...prev, name: text }))
            }
            onSubmit={handleSubmitEditDialog}
         />
      </View>
   );
}
