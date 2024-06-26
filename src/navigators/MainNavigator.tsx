import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect, useState } from "react";
import { Platform, StatusBar, StyleSheet, Text } from "react-native";
import TerritoriesAvailableScreen from "../screens/territories/Available";
import { FontAwesome } from "@expo/vector-icons";
import TerritoriesNavigator from "./TerritoriesNavigator";
import PreachersNavigator from "./PreachersNavigator";
import CongregationsInfoScreen from "../screens/congregations/Info";
import CongregationsNavigator from "./CongregationNavigator";
import SettingsScreen from "../screens/Settings";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import SettingsNavigator from "./SettingsNavigator";
import { isTablet } from "../helpers/devices";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import { PaperProvider, useTheme } from "react-native-paper";

const Tab = createMaterialBottomTabNavigator()

const MainNavigator = () => {
    const [secondaryContainerColor, setSecondaryContainerColor] = useState<string>('#28a74540');
    const {state, loadColor} = useContext(SettingsContext);
   
    useEffect(() => {
      loadColor()
      StatusBar.setBackgroundColor(state.mainColor)
      setSecondaryContainerColor(`${state.mainColor}50`)
    }, [state.mainColor])
    const theme = useTheme();
    theme.colors.secondaryContainer = secondaryContainerColor;
  
    return (
      <PaperProvider>
        <Tab.Navigator shifting={true} barStyle={{ backgroundColor: `${state.mainColor}15` }}>
            <Tab.Screen 
              name="Home"
              component={HomeNavigator}
              options={{
                tabBarIcon: ({color}) => <FontAwesome name='home' color={color} size={26} />,
              }}
            />
            <Tab.Screen 
              name="Tereny"
              component={TerritoriesNavigator}
              options={{
                tabBarIcon: ({color}) => <FontAwesome name='map-marker' color={color} size={26} />,
              }}
            />
            <Tab.Screen 
              name="Głosiciele"
              component={PreachersNavigator}
              options={{
                tabBarIcon: ({color}) => <FontAwesome name='user' color={color} size={26} />,
        
              }}
            />
            <Tab.Screen 
              name="Zbór"
              component={CongregationsNavigator}
              options={{
                tabBarIcon: ({color}) => <FontAwesome name='users' color={color} size={26} />,
        
      
              }}
            />
            <Tab.Screen 
              name="Ustawienia"
              component={SettingsNavigator}
              options={{
                tabBarIcon: ({color}) => <FontAwesome name='gear' color={color} size={26} />,
              
              }}
            />
          </Tab.Navigator>
      </PaperProvider>
        
    )
}

export default MainNavigator;