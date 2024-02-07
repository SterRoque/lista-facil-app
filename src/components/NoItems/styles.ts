import { StyleSheet } from 'react-native'
import { theme } from '../../constants/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 120
  },
  text: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center'
  }
})