import { View, Text } from 'react-native';
import { styles } from './styles';
import { ActivityIndicator } from 'react-native-paper';

export function Preloader() {
   return (
      <View style={styles.container}>
         <ActivityIndicator
            size='large'
            style={{
               transform: 'scale(1.5)',
            }}
         />
      </View>
   );
}
