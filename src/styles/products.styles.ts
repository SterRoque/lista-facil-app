import { theme } from 'constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   containerProducts: {
      paddingTop: 45,
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
      top: 30,
      left: 0,
      height: 60,
      width: 60,
   },
   buttonAddProduct: {
      paddingHorizontal: 17,
      height: 40,
      marginTop: 20,
      borderRadius: 8,
      gap: 9,
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   nameBtnAddProduct: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
   },
   charContainer: {
      width: '65.5%',
      marginLeft: 22,
      marginTop: 25,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   charText: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      fontSize: 16,
   },
   priceProductTotal: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      textAlign: 'right',
      width: '90%',
      // position: 'absolute',
      // right: 34,
      // bottom: 10,
      // zIndex: 1,
   },
});
