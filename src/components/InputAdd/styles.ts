import { StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

export const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
<<<<<<< HEAD
      width: '100%',
=======
      width: '80%',
>>>>>>> f28fe81 (fix: responsiveness)
      justifyContent: 'center',
      marginTop: 56,
   },
   input: {
      width: '100%',
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
   },
   fab: {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      borderRadius: 0,
      marginLeft: -55,
      backgroundColor: theme.colors.primary,
   },
});
