import { theme } from 'constants/theme';
import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.opacityBlack,
      position: 'absolute',
      zIndex: 5,
   },
});
