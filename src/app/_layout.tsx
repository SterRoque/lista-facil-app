import 'reflect-metadata';
import { theme } from 'constants/theme';
import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function Layout() {
   return (
      <PaperProvider theme={theme}>
         <Slot />
      </PaperProvider>
   );
}
