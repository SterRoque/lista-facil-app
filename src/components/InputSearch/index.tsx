import { TouchableOpacity, View } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import { styles } from './styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { theme } from '../../constants/theme';

type InputSearchProps = {
   onChangeText: (text: string) => void;
   value: string;
};

export function InputSearch({ onChangeText, value }: InputSearchProps) {
   return (
      <View style={styles.container}>
         <TextInput
            style={styles.input}
            mode='flat'
            underlineStyle={{ display: 'none' }}
            placeholder='Pesquise um produto'
            value={value}
            onChangeText={onChangeText}
            keyboardAppearance='light'
         />

         <FontAwesome
            name='search'
            size={20}
            color={theme.colors.primary}
            style={styles.icon}
         />
      </View>
   );
}
