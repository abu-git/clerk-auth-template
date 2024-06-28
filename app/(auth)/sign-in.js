import {  useSignIn } from "@clerk/clerk-expo"
import { Link, useRouter } from "expo-router"
import { Text, TextInput, Button, View } from "react-native"
import React, { useState, useCallback } from "react"

const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")

    const onSignInPress = useCallback(async () => {
        if (!isLoaded) {
            return
        }

        try{
            const signInAttempt = await signIn.create({ identifier: emailAddress, password });

            if(signInAttempt.status === 'complete'){
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            }else{
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        }catch(err){
            console.error(JSON.stringify(err, null, 2))
        }
    }, [isLoaded, emailAddress, password])
    return (
        <View>
            <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            />
            <TextInput
                value={password}
                placeholder="Password..."
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
            />
            <Button title="Sign In" onPress={onSignInPress} />

            <View>
                <Text>Don't have an account?</Text>
                <Link href="/sign-up">
                    <Text>Sign up</Text>
                </Link>
            </View>
        </View>
    )
}

export default SignIn