import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import TerritoriesAvailableScreen from "../screens/territories/AvailableScreen";
import { FontAwesome } from "@expo/vector-icons";
import TerritoriesNavigator from "./TerritoriesNavigator";
import PreachersNavigator from "./PreachersNavigator";
import CongregationsInfoScreen from "../screens/congregations/InfoScreen";
import CongregationsNavigator from "./CongregationNavigator";

const Tab = createBottomTabNavigator()

const MainNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerStyle: headerStyles.header,
            headerTitleStyle: headerStyles.title,
            tabBarActiveTintColor: '#28a745',
          }}>
            <Tab.Screen 
              name="Home"
              component={TerritoriesAvailableScreen}
              options={{
                tabBarIcon: ({color, size}) => <FontAwesome name='home' color={color} size={size} />
              }}
            />
            <Tab.Screen 
              name="Tereny"
              component={TerritoriesNavigator}
              options={{
                headerShown: false,
                tabBarIcon: ({color, size}) => <FontAwesome name='map-marker' color={color} size={size} />
                
              }}
            />
            <Tab.Screen 
              name="Głosiciele"
              component={PreachersNavigator}
              options={{
                tabBarIcon: ({color, size}) => <FontAwesome name='user' color={color} size={size} />,
                headerShown: false
              }}
            />
            <Tab.Screen 
              name="Zbór"
              component={CongregationsNavigator}
              options={{
                tabBarIcon: ({color, size}) => <FontAwesome name='users' color={color} size={size} />,
                headerShown: false
              }}
            />
          </Tab.Navigator>
    )
}

const headerStyles = StyleSheet.create({
    header: {
      backgroundColor: '#28a745',
    },
    title: { 
      color: 'white',
      fontFamily: 'MontserratSemiBold', 
      fontSize: 20 
    }
  })

export default MainNavigator;