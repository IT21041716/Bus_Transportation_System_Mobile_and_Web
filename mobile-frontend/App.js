import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import store from "./screen/IT21041716/store/index";
import { Provider } from "react-redux";

import SmartCard from "./screen/it21042560/Smartcard";
import AdminLogin from "./screen/IT21049590/AdminLogin";
import AdminProfile from "./screen/IT21049590/AdminProfile";
import ReservationCancel from "./screen/IT21049590/ReservationCancel";
import ReservationCancelForm from "./screen/IT21049590/ReservationCancelForm";
import Reservations from "./screen/IT21049590/Reservations";
import TopUp from "./screen/IT21041716/topup";
import Login from "./screen/IT21041716/login";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Adminlog"
        component={AdminLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Adminpto"
        component={AdminProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NutritionPlanSelect"
        component={SmartCard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminLogin"
            component={AdminLogin}
            opti
            ons={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminProfile"
            component={AdminProfile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function MainScreen() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "#4169e1" }}>
      <Tab.Screen
        name="Home"
        component={MainStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "ios-home" : "ios-home-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={MainStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "ios-settings" : "ios-settings-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cash"
        component={TopUp}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "cash-outline" : "cash-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
