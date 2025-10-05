import UserInfo from '@/src/types/auth/User'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as schema from '../../database/schema'
import { useAuth } from '../../hooks/useAuth'



const SignUp = () => {
    const userdb = useSQLiteContext();
    const db = drizzle(userdb, { schema });

    const { user, loading, addUser } = useAuth(db)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")




    const addUserInfo = () => {
        const userInfo: UserInfo = { email: email, name: name, password: password }

        addUser(userInfo)
    }

    return (

        <SafeAreaView style={styles.container}>
            <Text style={styles.headingText}>SignUp</Text>
            <TextInput style={styles.textInput} placeholder='Email' onChangeText={(email) => setEmail(email)}></TextInput>
            <TextInput style={styles.textInput} placeholder='Username' onChangeText={(name) => setName(name)}></TextInput>
            <TextInput style={styles.textInput} placeholder='Password' onChangeText={(password) => setEmail(password)}></TextInput>
            <TouchableOpacity style={styles.button} onPress={() => addUserInfo()}>
                <Text>Submit </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SignUp


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