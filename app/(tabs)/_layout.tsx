import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Icon } from 'react-native-paper';
import { View } from '@/components/Themed';
import TabBarHeaderRight from '@/components/TabBarHeaderRight';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => <TabBarHeaderRight />
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: '我的',
          headerTitle: () => (
            <View style={{marginRight: 15}}>
              <Icon source="chevron-left" size={24} color="#000" />
            </View>
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => (
            <View style={{marginRight: 15}}>
              <Icon source="dots-horizontal" size={24} color="#000" />
            </View>
          )
        }}
      />
    </Tabs>
  );
}
