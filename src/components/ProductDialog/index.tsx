import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from './styles';
import { View } from 'react-native';
import { theme } from 'constants/theme';
import { ProductModel } from 'models/product-model';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MoneyMaskInput } from 'components/MoneyMaskInput';
import { numberToBRL } from 'utils/number-to-brl';

export type ProductErrors = {
   name?: boolean;
   quantity?: boolean;
   price?: boolean;
};

type ProductDialogProps = {
   title: string;
   isOpen: boolean;
   onClose?: () => void;
   onSubmit?: () => void;
   setProduct: Dispatch<SetStateAction<ProductModel>>;
   product: ProductModel;
   errors: ProductErrors;
   setErrors: Dispatch<SetStateAction<ProductErrors>>;
};
export function ProductDialog({
   title,
   isOpen = false,
   product,
   errors,
   setErrors,
   setProduct,
   onClose,
   onSubmit,
}: ProductDialogProps) {
   const [productPrice, setProductPrice] = useState<string>('');

   function onChangeText(text: string, prop: 'name' | 'quantity' | 'price') {
      setProduct((prev) => ({
         ...prev,
         [prop]: text,
      }));

      if (prop == 'price') {
         const priceFormat = Number(
            text.replace('R$ ', '').replace('.', '').replace(',', '.'),
         );

         setProductPrice(text);

         setProduct((prev) => ({
            ...prev,
            price: priceFormat,
         }));
      }

      if (errors[prop]) {
         setErrors((prevState) => ({
            ...prevState,
            [prop]: false,
         }));
      }
   }

   useEffect(() => {
      if (isOpen && product.price) {
         setProductPrice(numberToBRL(product.price));
      } else if (!isOpen) {
         setProductPrice('');
      }
   }, [isOpen]);

   return (
      <Portal>
         <Dialog
            visible={isOpen}
            onDismiss={onClose}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Content>
               <Text variant='bodyLarge'>
                  Adicione itens na sua lista de compras
               </Text>
               <TextInput
                  label={'Nome'}
                  style={{ marginTop: 11 }}
                  value={product?.name}
                  onChangeText={(text) => onChangeText(text, 'name')}
                  error={errors?.name}
                  keyboardAppearance='light'
               />
               <View style={styles.inputContainer}>
                  <TextInput
                     label='Quantidade'
                     style={styles.input}
                     value={product?.quantity?.toString()}
                     onChangeText={(text) => onChangeText(text, 'quantity')}
                     error={errors?.quantity}
                     keyboardType='numeric'
                     keyboardAppearance='light'
                  />
                  {/* <TextInput
                     label='Preço'
                     style={styles.input}
                     value={product?.price?.toString()}
                     onChangeText={(text) => onChangeText(text, 'price')}
                     error={errors?.price}
                     keyboardType='numeric'
                     keyboardAppearance='light'
                  /> */}

                  <MoneyMaskInput
                     label='Preço'
                     value={productPrice}
                     onChangeText={(text) => {
                        onChangeText(text, 'price');
                        console.log(text);
                     }}
                     error={errors?.price}
                  />
               </View>
            </Dialog.Content>
            <Dialog.Actions>
               <Button
                  onPress={onClose}
                  textColor={theme.colors.error}>
                  Cancelar
               </Button>
               <Button onPress={onSubmit}>Salvar</Button>
            </Dialog.Actions>
         </Dialog>
      </Portal>
   );
}
