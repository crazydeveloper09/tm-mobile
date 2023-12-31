import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import TerritoriesAvailableScreen from "../screens/territories/AvailableScreen";
import { FontAwesome } from "@expo/vector-icons";
import TerritoriesNavigator from "./TerritoriesNavigator";
import PreachersNavigator from "./PreachersNavigator";
import CongregationsInfoScreen from "../screens/congregations/InfoScreen";
import CongregationsNavigator from "./CongregationNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const Tab = createBottomTabNavigator()

const MainNavigator = () => {

    const {state, loadColor} = useContext(SettingsContext);
    useEffect(() => {
      loadColor()
    }, [state.mainColor])

    return (
        <Tab.Navigator screenOptions={{
            headerStyle: { backgroundColor: state?.mainColor },
            headerTitleStyle: headerStyles.title,
            tabBarActiveTintColor: state?.mainColor,
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
            <Tab.Screen 
              name="Ustawienia"
              component={SettingsScreen}
              options={{
                tabBarIcon: ({color, size}) => <FontAwesome name='gear' color={color} size={size} />,
              }}
            />
          </Tab.Navigator>
    )
}

const headerStyles = StyleSheet.create({
    title: { 
      color: 'white',
      fontFamily: 'MontserratSemiBold', 
      fontSize: 20 
    }
  })

export default MainNavigator;