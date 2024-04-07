import { theme } from 'constants/theme';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';

type EditDialogProps = {
   isOpen: boolean;
   value: string | undefined;
   onClose: () => void;
   onSubmit: () => void;
   onChangeText: (text: string) => void;
};

export function EditCategoryDialog({
   isOpen = false,
   value,
   onClose,
   onSubmit,
   onChangeText,
}: EditDialogProps) {
   return (
      <Portal>
         <Dialog
            visible={isOpen}
            onDismiss={onClose}>
            <Dialog.Title>Editar o nome</Dialog.Title>
            <Dialog.Content>
               <TextInput
                  mode='outlined'
                  style={{
                     marginTop: 11,
                     marginBottom: 18,
                     backgroundColor: theme.colors.surfaceVariant,
                  }}
                  outlineColor={theme.colors.primary}
                  value={value}
                  onChangeText={onChangeText}
               />
            </Dialog.Content>
            <Dialog.Actions>
               <Button
                  onPress={onClose}
                  textColor={theme.colors.error}>
                  Cancelar
               </Button>
               <Button onPress={onSubmit}>Confirmar</Button>
            </Dialog.Actions>
         </Dialog>
      </Portal>
   );
}
