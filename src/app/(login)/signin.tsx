import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as schema from '../../database/schema'
import { useAuth } from '../../hooks/useAuth'


const Login = () => {
    const userdb = useSQLiteContext();
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const db = drizzle(userdb, { schema });
    const { user } = useAuth(db)

    const checkAndSignIn = () => {
       let login = user.find((u) => u.username === userName)

        console.log("Login value "+login)
       
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headingText}>Login</Text>
            <TextInput style={styles.textInput} placeholder='Username' onChangeText={(name) => setUsername(name)}></TextInput>
            <TextInput style={styles.textInput} placeholder='Password' onChangeText={(password)=> setPassword(password)} ></TextInput>
            <TouchableOpacity style={styles.button} onPress={()=>checkAndSignIn()}>
                <Text>Submit </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20
    },
    headingText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "orange",
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 20

    },
    textInput: {
        borderColor: "orange",
        borderWidth: 2,
        borderRadius: 10,
        width: "70%",
        paddingVertical: 10,
        paddingHorizontal: 10
    }

})