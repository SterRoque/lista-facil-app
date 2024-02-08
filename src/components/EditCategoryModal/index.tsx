import { Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from './styles'
import { TouchableOpacity, View } from 'react-native'
import { theme } from 'constants/theme'

type EditModalProps = {
  isOpen: boolean
  value: string | undefined
  onClose: () => void
  onSubmit: () => void
  onChangeText: (text: string) => void
}

export function EditCategoryModal({isOpen = false, value, onClose, onSubmit, onChangeText}: EditModalProps) {

  return(
    <Portal>
      <Modal visible={isOpen} onDismiss={onClose} contentContainerStyle={styles.modal}>
        <View style={styles.box}>
          <Text style={styles.titleBox}>Editar o nome</Text>
          <TextInput 
            mode='outlined' 
            style={{marginTop: 11, marginBottom: 18}} 
            outlineColor={theme.colors.primary}
            value={value}
            onChangeText={onChangeText}
          />
          <View style={styles.actionContainer}>

            <TouchableOpacity style={styles.action} onPress={onClose}>
              <Text style={{...styles.actionText, color: theme.colors.error}}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={onSubmit}>
              <Text style={styles.actionText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  )

}