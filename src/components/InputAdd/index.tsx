import { View } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import { styles } from './styles';
import { theme } from '../../constants/theme';

type InputAddProps = {
   onChangeText: (text: string) => void;
   value: string;
   onAdd: () => void;
};

export function InputAdd({ onChangeText, value, onAdd }: InputAddProps) {
   return (
      <View style={styles.container}>
         <TextInput
            style={styles.input}
            mode='flat'
            underlineStyle={{ display: 'none' }}
            label='Nome da lista'
            value={value}
            onChangeText={onChangeText}
            keyboardAppearance='light'
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
