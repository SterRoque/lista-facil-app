import { PaperProvider } from 'react-native-paper'
import Home from './src/screens/Home'
import { theme } from './src/constants/theme'

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Home />
    </PaperProvider>
  )
}
