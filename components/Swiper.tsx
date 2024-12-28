import { View, StyleSheet, StyleProp, ViewStyle, Image, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useState } from 'react';

interface Props {
    style?: StyleProp<ViewStyle>,
    pagination?: boolean,
    images: string[]
}

export default function Swiper({ style, pagination = true, images }: Props) {
    const [currentPage, setCurrentPage] = useState(0)
    return (
        <View style={[styles.container, style]}>
            <PagerView style={styles.page} initialPage={currentPage} onPageSelected={e => setCurrentPage(e.nativeEvent.position)}>
                {
                    images.length > 0 && images.map((image, index) => (
                        <View key={index}>
                            <Image source={{ uri: image }} style={styles.image} />
                            <Text>{image}</Text>
                        </View>
                    ))
                }
            </PagerView>
            {pagination && <View style={styles.pagination}>
                {
                    Array.from({ length: images.length }).map((_, index) => (
                        <View key={index} style={[styles.paginationItem, { backgroundColor: currentPage === index ? '#000' : '#C9C9C9' }]} />
                    ))
                }
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '30%',
        marginBottom: 20,
        position: 'relative'
    },
    page: {
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    pagination: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 8
    },
    paginationItem: {
        width: 8,
        height: 8,
        borderRadius: 100
    }
})


