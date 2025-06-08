import Map from '@/components/map';
import RequestModal from '@/components/RequestModal';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen() {
    return (
        <>
            <StatusBar />
            <SafeAreaView className="flex-1">
                <View className="flex-1">
                    <View className="flex-1">
                        <Map />
                        <RequestModal />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
