import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      width: '90%',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 30,
      gap: 4,
   },
   input: {
      flex: 1,
      flexShrink: 1,
      borderRadius: 8,
   },
   icon: {
      position: 'absolute',
      right: 20,
      top: 15,
   },
});
