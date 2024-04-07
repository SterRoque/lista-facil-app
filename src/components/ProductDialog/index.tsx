import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from './styles'
import { View } from 'react-native'
import { theme } from 'constants/theme'
import { ProductModel } from 'models/product-model'
import { Dispatch, SetStateAction } from 'react'

type ProductDialogProps = {
  title: string
  isOpen: boolean
  onClose?: () => void
  onSubmit?: () => void
  setProduct: Dispatch<SetStateAction<ProductModel>>
  product: ProductModel
}
export function ProductDialog({
  title, 
  isOpen=false, 
  product,
  setProduct,
  onClose, 
  onSubmit
}: ProductDialogProps
) {

  function onChangeText(text: string, prop: string) {
    setProduct((prev) => ({
      ...prev, 
      [prop]: text
    }))
  }

  return(
    <Portal>
      <Dialog visible={isOpen}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant='bodyLarge'>Adicione itens na sua lista de compras</Text>
          <TextInput 
            label='Nome' 
            style={{marginTop: 11}} 
            value={product?.name}
            onChangeText={text => onChangeText(text, 'name')}
          />
          <View style={styles.inputContainer}>
            <TextInput 
              label='Quantidade'  
              style={styles.input} 
              value={product?.quantity?.toString()}
              onChangeText={text => onChangeText(text, 'quantity')}
            />
            <TextInput 
              label='Preço'  
              style={styles.input} 
              value={product?.price?.toString()}
              onChangeText={text => onChangeText(text, 'price')}
            />
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