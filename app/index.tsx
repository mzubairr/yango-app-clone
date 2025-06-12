// @ts-ignore
import CustomModal from '@/components/modal';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Image, Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      {modalVisible && <View className='flex-1 absolute inset-0 bg-[rgba(154,154,154,0.3)] z-10' />}
      <SafeAreaView className='flex-1 px-5 py-2 bg-white overflow-x-hidden'>
        {/* header */}
        <View className='h-[50px] w-[150px]'>
          <Image
            className='h-full w-full'
            resizeMode='contain'
            source={require("@/assets/images/yango-logo.png")}
          />
        </View>
        <View className='flex-row items-center gap-1'>
          <Text className='text-2xl py-3 font-bold'>Your Location</Text>
          <MaterialCommunityIcons name="arrow-right-drop-circle" size={26} color="black" />
        </View>
        {/* yango images */}
        <View className='flex-row items-center w-[100%] h-[180px]'>
          <View className='h-[100%] w-[50%] p-1'>
            <Image
              className='h-[100%] w-[100%]'
              source={require("@/assets/images/motorbike.png")}
              resizeMode='cover'
            />
          </View>
          <View
            className='h-[100%] w-[50%] p-1'>
            <Image
              className='h-[100%] w-[100%]'
              source={require("@/assets/images/economycar.png")}
              resizeMode='cover'
            />
          </View>
        </View>
        {/* search query */}
        <Pressable
          onPress={() => setModalVisible(true)}
          className="mt-7 flex-row items-center bg-[#e0e0e0] rounded-full h-[60px] relative overflow-hidden"
        >
          <View className="py-1 absolute left-0 h-full w-[130px] overflow-hidden z-10">
            <Image
              className="w-[250px] h-full -translate-x-[45%]"
              source={{ uri: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" }}
              resizeMode="contain"
            />
          </View>
          <View className="absolute inset-0 flex items-center justify-center">
            <Text className="text-xl font-semibold">Where to?</Text>
          </View>
          <View className="absolute right-4 z-10">
            <MaterialCommunityIcons name="arrow-right-drop-circle" size={25} color="black" />
          </View>
        </Pressable>

        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />

      </SafeAreaView>
    </>
  );
}