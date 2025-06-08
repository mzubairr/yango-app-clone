// @ts-ignore
import ridercar from '@/assets/images/ride-car.png';
import CustomModal from '@/components/modal';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <SafeAreaView className='flex-1 p-5 bg-white overflow-x-hidden'>
        {/* header */}
        <Image
          height={50}
          width={150}
          source={{
            uri: ('https://brandlogos.net/wp-content/uploads/2023/09/yango-logo_brandlogos.net_tymas.png')
          }}
        />
        <Text className='text-3xl py-3 font-[500]'>
          Your Location<MaterialCommunityIcons name="arrow-right-drop-circle" size={26} color="black" />
        </Text>

        {/* yango images */}
        <View className='flex-row items-center w-[100%] h-[180px] gap-0 px-5'>
          <View className='h-[100%] w-[50%]'>
            <Image
              className='h-[100%] w-[100%]'
              // source={deliveryman}
              source={{
                uri: ('https://avatars.mds.yandex.net/get-lpc/12602567/6913a587-752e-4f38-8314-8299ea676375/orig')
              }}
              resizeMode='cover'
            />
          </View>
          <View
            className='h-[100%] w-[50%]'>
            <Image
              className='h-[100%] w-[100%]'
              source={ridercar}
              resizeMode='cover'
            />
          </View>
        </View>

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