import 'reflect-metadata';
import { theme } from 'constants/theme';
import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { PreloaderContextProvider } from 'contexts/PreloaderContext';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
   return (
      <PaperProvider theme={theme}>
         <PreloaderContextProvider>
            <StatusBar style='dark' />
            <Slot />
         </PreloaderContextProvider>
      </PaperProvider>
   );
}
