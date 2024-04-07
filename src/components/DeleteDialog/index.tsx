import { theme } from 'constants/theme';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

type DeleteDiologProps = {
   itemName: string;
   onRemove: () => void;
   onClose: () => void;
   isOpen: boolean;
};

export function DeleteDialog({
   itemName,
   onRemove,
   onClose,
   isOpen,
}: DeleteDiologProps) {
   return (
      <Portal>
         <Dialog
            visible={isOpen}
            onDismiss={onClose}>
            <Dialog.Title>Atenção</Dialog.Title>
            <Dialog.Content>
               <Text variant='bodyLarge'>Deseja excluir {itemName}?</Text>
            </Dialog.Content>
            <Dialog.Actions>
               <Button
                  onPress={onClose}
                  textColor={theme.colors.error}>
                  Não
               </Button>
               <Button onPress={onRemove}>Sim</Button>
            </Dialog.Actions>
         </Dialog>
      </Portal>
   );
}
