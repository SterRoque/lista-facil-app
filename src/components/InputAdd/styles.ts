import { StyleSheet } from 'react-native'
import { theme } from '../../constants/theme'

export const styles =  StyleSheet.create({

  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 56
    
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
  }
  
})