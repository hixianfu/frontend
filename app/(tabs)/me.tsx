import ThemedContainer from '@/components/ThemedContainer';
import { StyleSheet, View } from 'react-native';
import Swiper from '@/components/Swiper';
import { useState } from 'react';

export default function TabMeScreen() {
  const [images, setImages] = useState([
    'https://xianfu-1321684111.cos.ap-guangzhou.myqcloud.com/image/1735287895111-swiper1.jpg',
    'https://xianfu-1321684111.cos.ap-guangzhou.myqcloud.com/image/1735287915237-swiper2.jpg',
    'https://xianfu-1321684111.cos.ap-guangzhou.myqcloud.com/image/1735287927105-swiper3.jpg'
  ])

  return (
    <ThemedContainer>
      <Swiper images={images} />

      {/* <View style={{ flexDirection: 'row', gap: 8, display: 'flex', justifyContent: 'space-between' }}>
        <View>
          <Text>father1</Text>
        </View>
        <View>
          <Text>father2</Text>
        </View>
        <View>
          <Text>father3</Text>
        </View>
      </View> */}
    </ThemedContainer>
  )
}

const styles = StyleSheet.create({
});
