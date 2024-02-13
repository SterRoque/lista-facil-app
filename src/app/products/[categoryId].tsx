import { CategoryEntity, ProductEntity } from 'database/entities'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { findCategoryByIdService } from 'services/categories-service'
import { styles } from 'styles/products.styles'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { theme } from 'constants/theme'
import { NoItems } from 'components/NoItems'
import { ProductDialog } from 'components/ProductDialog'
import { Product } from 'components/Product'

export default function Products() {

  const [category, setCategory] = useState<CategoryEntity | null>(null)
  const { categoryId } = useLocalSearchParams()
  const [products, setProducts] = useState<ProductEntity[]>([])

  async function fetchCategory() {
    const categoryResponse = await findCategoryByIdService(Number(categoryId)) 
    setCategory(categoryResponse)

  }
  
  useEffect(() => {
    fetchCategory()
  }, [])

  return (

    <View style={styles.containerProducts}>
      <TouchableOpacity onPress={router.back} style={styles.iconBack} >
        <Ionicons 
          name='arrow-back-sharp' 
          size={30} 
          color={theme.colors.primary}
        />
      </TouchableOpacity>
      <Text style={styles.categoryName}>{category?.name}</Text>
      <TouchableOpacity style={styles.buttonAddProduct}>
        <Text style={styles.nameBtnAddProduct}>Adicionar produto</Text> 
        <AntDesign name='plus' size={24} color='white'/>
      </TouchableOpacity>

     

      <View>
        <View style={styles.charContainer}>
          <View style={{flexDirection: 'row', gap: 20}}>
            <Text style={styles.charText}>Qtd</Text>
            <Text style={styles.charText}>Produto</Text>
          </View>
          <Text style={styles.charText}>Preço</Text>
        </View>
        <FlatList 

          data={[
            {
              name: 'coco',
              price: 2.50,
              quantity: 5,
              id: 1
            }
          ]}
          style={{width: '100%'}}
          contentContainerStyle={{gap: 10, alignItems: 'center'}}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <Product product={item}/>}
          ListEmptyComponent={() => <NoItems text='Não há produtos cadastrados'/>}
      
        />

      </View>

      <ProductDialog title='Adicionar item' isOpen={false}></ProductDialog>
    </View>
  )
}