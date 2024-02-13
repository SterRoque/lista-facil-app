import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from './styles'
import { View } from 'react-native'
import { theme } from 'constants/theme'

type ProductDialogProps = {
  title: string
  isOpen: boolean
  onClose?: () => void
  onSubmit?: () => void
}
export function ProductDialog({title, isOpen=false, onClose, onSubmit}: ProductDialogProps) {
  return(
    <Portal>
      <Dialog visible={isOpen}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant='bodyLarge'>Adicione itens na sua lista de compras</Text>
          <TextInput label='nome' disabled style={{marginTop: 11}}/>
          <View style={styles.inputContainer}>
            <TextInput label='Quantidade' disabled style={styles.input}/>
            <TextInput label='preço' disabled style={styles.input}/>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose} textColor={theme.colors.error}>Cancelar</Button>
          <Button onPress={onSubmit}>Salvar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}