import { theme } from 'constants/theme';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'react-native-paper';
import { styles } from './styles';
import { router } from 'expo-router';

type CategoryProps = {
   title: string;
   id: number;
   onRemove?: () => void;
   onEdit?: () => void;
};

export function Category({ title, onRemove, onEdit, id }: CategoryProps) {
   function handleGoToProducts() {
      router.push(`/products/${id}`);
   }
   return (
      <View style={styles.categoryContainer}>
         <View
            style={{
               width: '100%',
               flexDirection: 'row',
               justifyContent: 'space-between',
               alignItems: 'center',
               paddingHorizontal: 16,
               paddingRight: 30,
            }}>
            <TouchableOpacity
               style={styles.touchText}
               onPress={handleGoToProducts}>
               <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>

            <View style={styles.icons}>
               <TouchableOpacity
                  style={styles.touchIcons}
                  onPress={onEdit}>
                  <Icon
                     source='pencil-outline'
                     size={25}
                     color={theme.colors.primary}
                  />
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.touchIcons}
                  onPress={onRemove}>
                  <Icon
                     source='trash-can-outline'
                     size={25}
                     color={theme.colors.primary}
                  />
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
}
