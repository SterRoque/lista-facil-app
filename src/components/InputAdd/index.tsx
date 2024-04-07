import { View } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import { styles } from './styles';
import { theme } from '../../constants/theme';
import { Dispatch, SetStateAction } from 'react';

type InputAddProps = {
   onChangeText: (text: string) => void;
   value: string;
   onAdd: () => void;
   hasError: boolean;
   setHasError: Dispatch<SetStateAction<boolean>>;
};

export function InputAdd({
   onChangeText,
   value,
   onAdd,
   hasError = false,
   setHasError,
}: InputAddProps) {
   return (
      <View style={styles.container}>
         <TextInput
            style={styles.input}
            mode='flat'
            underlineStyle={{ display: 'none' }}
            label='Nome da lista'
            value={value}
            onChangeText={(text) => {
               onChangeText(text);
               if (hasError) {
                  setHasError(false);
               }
            }}
            error={hasError}
         />
         <FAB
            color={theme.colors.onPrimary}
            mode='flat'
            icon='plus'
            style={styles.fab}
            onPress={onAdd}
         />
      </View>
   );
}
