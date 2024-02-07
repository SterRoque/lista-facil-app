import { View } from 'react-native'
import { FAB, TextInput } from 'react-native-paper'
import { styles } from './styles'
import { theme } from '../../constants/theme'


export function InputAdd() {
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        mode='flat'
        underlineStyle={{display:'none'}}
        label='Nome da lista' 
      />
      <FAB 
        color={theme.colors.onPrimary}
        mode='flat'
        icon='plus'
        style={styles.fab}
      />
    </View>

  )
}