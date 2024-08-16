import React, { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TerritoriesNavigator from "./TerritoriesNavigator";
import PreachersNavigator from "./PreachersNavigator";
import CongregationsNavigator from "./CongregationNavigator";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import SettingsNavigator from "./SettingsNavigator";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import { PaperProvider, useTheme } from "react-native-paper";

const Tab = createMaterialBottomTabNavigator()

const MainNavigator = () => {
    const [secondaryContainerColor, setSecondaryContainerColor] = useState<string>('#28a74540');
    const {state} = useContext(SettingsContext);
  
    useEffect(() => {
      setSecondaryContainerColor(`${state.mainColor}50`)
    }, [])
    const theme = useTheme();
    theme.colors.secondaryContainer = secondaryContainerColor;
  
    return (
      <PaperProvider>
        <Tab.Navigator barStyle={{ backgroundColor: `${state.mainColor}15` }}>
            <Tab.Screen 
              name="Home"
              component={HomeNavigator}
              options={{
                tabBarIcon: ({color}) => <MaterialCommunityIcons name='home' color={color} size={28} />,
              }}
            />
            <Tab.Screen 
              name="Tereny"
              component={TerritoriesNavigator}
              options={{
                tabBarIcon: ({color}) => <MaterialCommunityIcons name='map-marker' color={color} size={28} />,
              }}
            />
            <Tab.Screen 
              name="Głosiciele"
              component={PreachersNavigator}
              options={{
                tabBarIcon: ({color}) => <MaterialCommunityIcons name='account' color={color} size={28} />,
        
              }}
            />
            <Tab.Screen 
              name="Zbór"
              component={CongregationsNavigator}
              options={{
                tabBarIcon: ({color}) => <MaterialCommunityIcons name='account-group' color={color} size={28} />,
        
      
              }}
            />
            <Tab.Screen 
              name="Ustawienia"
              component={SettingsNavigator}
              options={{
                tabBarIcon: ({color}) => <MaterialCommunityIcons name='cog' color={color} size={28} />,
              
              }}
            />
          </Tab.Navigator>
      </PaperProvider>
        
    )
}

export default MainNavigator;