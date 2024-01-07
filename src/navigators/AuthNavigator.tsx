import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CongregationsLoginScreen from "../screens/congregations/LoginScreen";
import CongregationsTwoFactorScreen from "../screens/congregations/TwoFactorScreen";
import { StyleSheet } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const Stack = createStackNavigator()

const AuthNavigator = () => {
    
    const {state, loadColor} = useContext(SettingsContext);
    useEffect(() => {
      loadColor()
    }, [state.mainColor])

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: state?.mainColor } ,
            headerTitleStyle: headerStyles.title,
            headerTintColor: 'white',
            
        }}>
            <Stack.Screen 
                name="Log in" 
                component={CongregationsLoginScreen} 
                options={{ 
                    headerTitle: 'Logowanie', 
                }}
            />  
            <Stack.Screen 
                name="TwoFactor" 
                component={CongregationsTwoFactorScreen} 
                options={{ headerTitle: 'Dwustopniowa weryfikacja' }}
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

export default AuthNavigator;