import { theme } from 'constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   containerProducts: {
      paddingHorizontal: 35,
      paddingTop: 80,
      alignItems: 'center',
      flex: 1,
   },
   categoryName: {
      color: theme.colors.primary,
      fontSize: 24,
      fontWeight: 'bold',
   },
   iconBack: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 65,
      left: 0,
      height: 60,
      width: 60,
   },
   buttonAddProduct: {
      height: 40,
      width: '70%',
      marginTop: 65,
      borderRadius: 8,
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   nameBtnAddProduct: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
   },
   charContainer: {
      width: '80%',
      paddingRight: 30,
      paddingLeft: 9,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   charText: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 40,
   },
   priceProductTotal: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: 'bold',
      position: 'absolute',
      right: 34,
      bottom: 10,
      zIndex: 1,
   },
});
