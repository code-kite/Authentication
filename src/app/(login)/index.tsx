import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import imagepath from '../../constants/imagePath'

const OnBoarding = () => {
  let router = useRouter()
  const login = () => {
      router.navigate("/(login)/signin")
  }
  const signUp = () => {
      router.navigate("/(login)/signup")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.topbanner} source={imagepath.login_top_banner} resizeMode="cover"></Image>
      <Text style={styles.headingText}>Welcome</Text>

      <TouchableOpacity onPress={login} style={styles.button}>
        <Text> Log In</Text>
      </TouchableOpacity>
      
        <TouchableOpacity onPress = {signUp} style={styles.button}>
        <Text> Sign Up</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default OnBoarding

const styles = StyleSheet.create({

  container: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  topbanner: {

  },
  button: {
    backgroundColor: "orange",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 20
  }

})