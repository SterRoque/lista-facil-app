import { FlatList, View } from 'react-native'
import Logo from '../assets/icons/logo.svg'
import { styles } from '../styles/home.styles'
import { InputAdd } from '../components/InputAdd'
import { NoItems } from '../components/NoItems'
import { Category } from 'components/Category'
import { useEffect, useState } from 'react'
import { dataSource } from 'database'
import { ActivityIndicator } from 'react-native-paper'
import { createCategoryService, deleteCategoryByIdService, getCategoriesService, updateCategoryService } from 'services/categories-service'
import { CategoryEntity } from 'database/entities'
import { EditCategoryModal } from 'components/EditCategoryModal'
import { CategoryModel } from 'models/category-model'

export default function Home() {

  const [isConnectingToDB, setIsConnectingToDB] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>('')
  const [categories, setCategories] = useState<CategoryEntity[]>([])
  const [category, setCategory] = useState<CategoryModel>({name: ''})
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)

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
  console.log(category)
  function handleOpenEditModal(item: CategoryModel) {
    setCategory(item)
    setIsOpenEditModal(true)
  }

  function handleCloseEditModal() {
    setIsOpenEditModal(false)
  }

  async function handleSubmitEditModal() {
    await updateCategoryService(category.id!, category.name)
    await fetchCategories()
    handleCloseEditModal()
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
            onEdit={() => handleOpenEditModal(item)}
            onRemove={() => deleteCategoryByIdService(item.id)
              .then(()=> fetchCategories())}
          />
        )}
        ListEmptyComponent={() => <NoItems text='Não há listas cadastradas'/>}
      
      />

      <EditCategoryModal 
        isOpen={isOpenEditModal} 
        onClose={handleCloseEditModal} 
        value={category.name} 
        onChangeText={(text) => setCategory((prev)=> ({...prev, name: text}))}
        onSubmit={handleSubmitEditModal}
      />
    </View>
    
  )

}
