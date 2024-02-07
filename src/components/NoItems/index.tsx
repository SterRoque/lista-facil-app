import { View } from 'react-native'
import ShopIcon from '../../assets/icons/shop.svg'
import { Text } from 'react-native-paper'
import { styles } from './styles'
type NoItemsProps = {
  text: string
}

export function NoItems({text}: NoItemsProps) {

  return(
    <View style={styles.container}>
      <ShopIcon />
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}