import { theme } from 'constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({

  modal: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    backgroundColor: 'white',
    padding: 30,
    width: '85%',
    borderRadius: 28
  },
  titleBox: {
    fontSize: 24,
  },
  action: {
    padding: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10
    

  },
  actionText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 14

  }

})

