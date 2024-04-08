import { theme } from 'constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   productContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surfaceVariant,
      paddingVertical: 14,
      // paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '90%',
      borderRadius: 8,
   },
   icons: {
      flexDirection: 'row',
      gap: 5,
   },
   text: {
      fontSize: 16,
      maxWidth: '80%',
   },
   touchIcons: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
   },
   touchText: {
      width: '80%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 10,
   },
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
      flex: 1,
   },
});
