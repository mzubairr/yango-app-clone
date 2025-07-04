import { auth } from '@/lib/firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    const handleSignup = async () => {
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            Alert.alert("Sign Up Successful");
            router.push("/login")
            setEmail("");
            setPassword("");
        } catch (error) {
            Alert.alert("Signup Failed. Please check your email and password.");
        }
    }
    return (
        <SafeAreaView className='bg-white flex-1'>
            <View className='h-1/6 w-1/4 self-center'>
                <Image
                    className='h-full w-full'
                    resizeMode='contain'
                    source={require("@/assets/images/yango-logo.png")}
                />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className='p-4 justify-around'>
                        <Text className='text-4xl capitalize font-bold mb-5'>Signup</Text>
                        <TextInput
                            inputMode='email'
                            value={email}
                            ref={emailRef}
                            returnKeyType='next'
                            onSubmitEditing={() => passwordRef.current?.focus()}
                            placeholder="Email"
                            className='h-16 p-4 rounded-full focus:border-black border border-gray-400 mb-3'
                            onChangeText={setEmail}
                        />
                        <View className='h-16 flex-row items-center justify-between rounded-full border border-gray-400 mb-3'>
                            <TextInput
                                style={{ flex: 1, height: '100%', paddingHorizontal: 16 }}
                                placeholder="Password"
                                secureTextEntry={!isVisible}
                                value={password}
                                ref={passwordRef}
                                onChangeText={setPassword}
                                inputMode="text"
                            />
                            {password !== '' && (
                                <Ionicons
                                    className="p-2"
                                    onPress={() => setIsVisible(!isVisible)}
                                    name={isVisible ? "eye-off" : "eye"}
                                    size={24}
                                    color="black"
                                />
                            )}
                        </View>
                        <TouchableOpacity className='bg-[#FF4931] p-3 rounded-full mt-10' onPress={handleSignup} >
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