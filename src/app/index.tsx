import { FlatList, View } from 'react-native'
import Logo from '../assets/icons/logo.svg'
import { styles } from '../styles/home.styles'
import { InputAdd } from '../components/InputAdd'
import { Text } from 'react-native-paper'
import { NoItems } from '../components/NoItems'

export default function Home() {
  return(
    <View style={styles.body}>
      <Logo />
      <InputAdd />

      <FlatList 
        data={[]}
        style={{width: '90%'}}
        //contentContainerStyle={{alignItems: 'center'}}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Text>{item}</Text>}
        ListEmptyComponent={() => <NoItems text='Não há listas cadastradas'/>}
      
      />
    </View>
    
  )

}