import { theme } from 'constants/theme';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'react-native-paper';
import { styles } from './styles';
import { ProductEntity } from 'database/entities';
import { numberToBRL } from 'utils/number-to-brl';

type ProductProps = {
   product: ProductEntity;
   onRemove?: () => void;
   onEdit?: () => void;
};

export function Product({ product, onEdit, onRemove }: ProductProps) {
   const total = product.price * product.quantity;

   return (
      <View style={styles.productContainer}>
         <View style={styles.touchText}>
            <View style={styles.container}>
               <Text style={styles.text}>{product.quantity}x</Text>
               <Text
                  numberOfLines={5}
                  style={styles.text}>
                  {product.name}
               </Text>
            </View>
            <Text style={styles.text}>{numberToBRL(total)}</Text>
         </View>

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
   );
}
