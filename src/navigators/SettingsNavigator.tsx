import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, StyleSheet } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import SettingsScreen from "../screens/Settings";
import PoliciesScreen from "../screens/Policies";

const Stack = createStackNavigator()

const SettingsNavigator = () => {

    const {state, loadColor} = useContext(SettingsContext);
    useEffect(() => {
      StatusBar.setBackgroundColor(state.mainColor)
    }, [state.mainColor])
    
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: state?.mainColor }, headerTitleStyle: headerStyles.title, headerTintColor: 'white'}}>
            <Stack.Screen 
                name="Settings" 
                component={SettingsScreen} 
                options={{ headerTitle: 'Ustawienia' }}
            />  
            <Stack.Screen 
                name="Policy" 
                component={PoliciesScreen} 
                options={{ headerTitle: 'Polityka prywatności i RODO' }}
            />  
            
        </Stack.Navigator>
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

export default SettingsNavigator;