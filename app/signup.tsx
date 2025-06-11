import { auth } from '@/lib/firebase';
import { Link, router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignup = async () => {
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            Alert.alert("User Signup");
            router.push("/login")
            setEmail("");
            setPassword("");
        } catch (error) {
            Alert.alert("Failed to signup", String(error));
        }
    }
    return (
        <SafeAreaView className='bg-white flex-1'>
            <Image
                className='h-1/5 w-1/5 self-center'
                resizeMode='contain'
                source={require("@/assets/images/yango-logo.png")}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className='p-4 justify-around'>
                        <Text className='text-4xl capitalize font-bold mb-5'>Signup</Text>
                        <TextInput value={email} placeholder="Email" className='h-16 p-4 rounded-full focus:border-black border border-gray-400 mb-3'
                            onChangeText={setEmail}
                        />
                        <TextInput value={password} placeholder="Password" className='h-16 p-4 rounded-full focus:border-black border border-gray-400 mb-3'
                            onChangeText={(setPassword)}
                        />
                        <TouchableOpacity className='bg-red-500 p-3 rounded-full mt-10' onPress={handleSignup} >
                            <Text className='text-white self-center text-xl'>Signup</Text>
                        </TouchableOpacity>
                        <Link href="/login" className='self-end mt-5 underline'>Already have an account?</Link>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Signup;