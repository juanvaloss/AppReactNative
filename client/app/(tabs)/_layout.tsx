import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'home-sharp' : 'home-outline'}
              color={focused ? '#FF6347' : '#696969'} // Color personalizado para esta pestaña
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Descubrir',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'compass' : 'compass-outline'}
              color={focused ? '#1E90FF' : '#696969'} // Color personalizado para esta pestaña
            />
          ),
        }}
      />
      <Tabs.Screen
        name="consult"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'star' : 'star-outline'}
              color={focused ? '#FFD700' : '#696969'} // Color personalizado para esta pestaña
            />
          ),
        }}
      />
    </Tabs>
  );
}
