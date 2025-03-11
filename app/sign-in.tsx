import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';

import images from '@/constants/images';
import icons from '@/constants/icons'; 
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';

const SignIn = () => {

  const {isLoggedIn, user, loading, refetch} = useGlobalContext();

  const handleLogin = async() => {

    const result = await login();
      if (result){
        refetch();
      } else {
        Alert.alert('Error', 'Failed to log in')
      }
    };



  return (
    <SafeAreaView className="bg-white h-full">
        <ScrollView contentContainerClassName="h-full">
            <Image source={images.onboarding} className="w-full h-4/6" resizeMode="contain"/>

              <View className = 'px-10'>
                
                <Text className = 'text-base text-center uppercase font-rubik text-black-200'>
                  Welcome to Restate
                </Text>

                <Text className = 'text-3xl font-rubik-bold text-black-300 text-center mt-2'>
                  Let's Get You closer to {'\n'}
                  <Text className = 'text-primary-300'>Your Ideal Home</Text>
                </Text>

                <Text className = 'text-lg font-rubik text-black-200 text-center mt-12'>
                    Login to Restate with Google
                </Text>


                <TouchableOpacity onPress={handleLogin} className = 'bg-white shadow-md shadow-zinc-300 rounded-full  w-full py-4 mt-5 flex-row items-center justify-center'>
                 <View className = 'flex-row items-center justify-center'>
                    <Image source={icons.google} className = 'w-5 h-5' resizeMode="contain" />

                    <Text className = 'text-lg font-rubik-mediumtext-black-300 ml-2'>
                      Continue with Google
                    </Text>

                  </View>
                </TouchableOpacity>

              </View>

        </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
 