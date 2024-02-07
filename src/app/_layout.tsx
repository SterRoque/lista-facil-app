import 'reflect-metadata'
import { useEffect, useState } from 'react'
import { theme } from 'constants/theme'
import { Slot } from 'expo-router'
import { ActivityIndicator, PaperProvider } from 'react-native-paper'
import { connecTotDB } from 'database/init'

export default function Layout() {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    connecTotDB.initialize()
      .then(() => console.log('Database connected'))
      .catch(() => alert('Error on init database'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <ActivityIndicator color={theme.colors.primary}/>
  }

  return (
    <PaperProvider theme={theme}>
      <Slot /> 
    </PaperProvider>
  )
}
