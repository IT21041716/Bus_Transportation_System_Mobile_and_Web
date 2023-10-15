import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import SmartCard from './screen/Smartcard';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='NutritionPlanSelect' component={SmartCard} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer> 
    <Tab.Navigator barStyle={{backgroundColor:'#4169e1'}}>
      <Tab.Screen
        name="Home"
        component={MainStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} size={size} color={color} />
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Settings"
        component={MainStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'ios-settings' : 'ios-settings-outline'} size={size} color={color} />
          ),
          headerShown:false
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
  );
}

