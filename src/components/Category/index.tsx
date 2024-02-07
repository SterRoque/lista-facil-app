import { theme } from 'constants/theme'
import { TouchableOpacity, View } from 'react-native'
import { Text, Icon } from 'react-native-paper'
import { styles } from './styles'

type CategoryProps = {
  title: string
  onRemove?: () => void
  onEdit?: () => void
}

export function Category({title, onRemove, onEdit }: CategoryProps) {
  return(
    <View style={styles.categoryContainer}>
      <TouchableOpacity style={styles.touchText}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>

      <View style={styles.icons}>
        <TouchableOpacity style={styles.touchIcons} onPress={onEdit}>
          <Icon source='pencil-outline' size={25} color={theme.colors.primary}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchIcons} onPress={onRemove}>
          <Icon source='trash-can-outline' size={25} color={theme.colors.primary}/>
        </TouchableOpacity>

      </View>
      
    </View>
  )
}