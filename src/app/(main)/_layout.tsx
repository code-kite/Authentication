import { Stack } from 'expo-router'
import React from 'react'

const MainRootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='index'></Stack.Screen>
    </Stack>
  )
}

export default MainRootLayout