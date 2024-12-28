import { useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import PagerView from 'react-native-pager-view';
import { Button } from "react-native-paper";

interface TabProps {
    label: string;
    isActive: boolean;
    onPress: () => void;
}

// 新增 Tab 组件
const Tab = ({ label, isActive, onPress }: TabProps) => (
    <View style={[isActive ? styles.tabContainer : {}]}>
        <Button onPress={onPress}>
            <Text style={{ color: isActive ? '#6851A4' : '#c9c9c9', fontWeight: isActive ? 'bold' : 'normal' }}>{label}</Text>
        </Button>
    </View>
);

interface TabsProps {
    tabLabels: string[];
    children: React.ReactNode[];
}

export default function Tabs({ tabLabels, children }: TabsProps) {
    const pagerRef = useRef<PagerView>(null);
    const [currentPage, setCurrentPage] = useState(0);

    const handleTabChange = (page: number) => {
        setCurrentPage(page);
        pagerRef.current?.setPage(page);
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                {tabLabels.map((label, index) => (
                    <Tab
                        key={index}
                        label={label}
                        isActive={currentPage === index}
                        onPress={() => handleTabChange(index)}
                    />
                ))}
            </View>

            <PagerView ref={pagerRef} style={{ height: '100%', width: '100%' }} onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)} initialPage={currentPage}>
                {children.map((child, index) => (
                    <View key={index}>
                        {child}
                    </View>
                ))}
            </PagerView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8
    },
    tabs: {
        flexDirection: 'row',
        gap: 8,
        display: 'flex',
        borderBottomWidth: 1,
        borderBottomColor: '#c9c9c9',
    },
    tabContainer: {
        borderBottomWidth: 2,
        borderBottomColor: '#6851A4',
    },
});