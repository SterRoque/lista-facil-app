import { FlatList, View } from 'react-native'
import Logo from '../assets/icons/logo.svg'
import { styles } from '../styles/home.styles'
import { InputAdd } from '../components/InputAdd'
import { NoItems } from '../components/NoItems'
import { Category } from 'components/Category'
import { useEffect, useState } from 'react'
import { dataSource } from 'database'
import { ActivityIndicator } from 'react-native-paper'
import { createCategoryService, deleteCategoryByIdService, getCategoriesService, updateCategoryService } from 'services/categories-services'
import { CategoryEntity } from 'database/entities'
import { EditCategoryDialog } from 'components/EditCategoryDialog'
import { CategoryModel } from 'models/category-model'
import { DeleteDialog } from 'components/DeleteDialog'

export default function Home() {

  const [isConnectingToDB, setIsConnectingToDB] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>('')
  const [categories, setCategories] = useState<CategoryEntity[]>([])
  const [category, setCategory] = useState<CategoryModel>({name: ''})
  const [isOpenEditDialog, setIsOpenEditDialog] = useState<boolean>(false)
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)

  async function fetchCategories() {
    const response = await getCategoriesService()
    setCategories(response)
  }

  async function handleAddCategory() {
    await createCategoryService(inputText)
    await fetchCategories()
    console.log(categories)
    setInputText('')
  } 

  function handleOpenEditDialog(item: CategoryModel) {
    setCategory(item)
    setIsOpenEditDialog(true)
  }

  function handleCloseEditDialog() {
    setIsOpenEditDialog(false)
  }

  function handleOpenDeleteDialog(item: CategoryModel) {
    setCategory(item)
    setIsOpenDeleteDialog(true)
  }

  function handleCloseDeleteDialog() {
    setIsOpenDeleteDialog(false)
  }

  async function handleDeleteCategory() {
    await deleteCategoryByIdService(category.id!)
    await fetchCategories()
    handleCloseDeleteDialog()
  }

  async function handleSubmitEditDialog() {
    await updateCategoryService(category.id!, category.name)
    await fetchCategories()
    handleCloseEditDialog()
  }
  

  useEffect(() => {
    const connectToDB = async () => {
      if (!dataSource.isInitialized) {
        try {
          setIsConnectingToDB(true)
          await dataSource.initialize()
          setIsConnectingToDB(false)
        } catch(e) {
          console.error(e)
        }
      }
    }

    connectToDB().then(() => fetchCategories())
  }, [])

  if (isConnectingToDB) {
    return (
      <View style={styles.body}>
        <ActivityIndicator />
      </View>
    )
  }

  console.log('sdsd')

  return (
    <View style={styles.body}>
      <Logo />
      <InputAdd onChangeText={text => setInputText(text)} value={inputText} onAdd={handleAddCategory}/>

      <FlatList 
        data={categories}
        style={{width: '100%', marginTop: 45}}
        contentContainerStyle={{gap: 10, alignItems: 'center'}}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Category 
            title={item.name} 
            onEdit={() => handleOpenEditDialog(item)}
            onRemove={() => handleOpenDeleteDialog(item)}
            id={item.id}
          />
        )}
        ListEmptyComponent={() => <NoItems text='Não há listas cadastradas'/>}
      
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
        onChangeText={(text) => setCategory((prev)=> ({...prev, name: text}))}
        onSubmit={handleSubmitEditDialog}
      />
    </View>

    
  )

}
