import { theme } from 'constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceVariant,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 8
  },
  icons: {
    flexDirection: 'row',
    gap: 10
  },
  text: {
    fontSize: 16,
    maxWidth: '78%'

  },
  touchIcons: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchText: {
    width: '80%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 19

  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flex: 1

  }
})