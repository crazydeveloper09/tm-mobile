import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, StyleSheet } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import TerritoriesAvailableScreen from "../screens/territories/Available";


const Stack = createStackNavigator()

const HomeNavigator = () => {

    const {state, loadColor} = useContext(SettingsContext);
    useEffect(() => {
      StatusBar.setBackgroundColor(state.mainColor)
    }, [state.mainColor])

    return (
        <Stack.Navigator initialRouteName='TerritoriesAvailable' screenOptions={{
            headerStyle: { backgroundColor: state?.mainColor },
            headerTitleStyle: headerStyles.title,
            headerTintColor: 'white'
        }}>
            
            <Stack.Screen 
                name="TerritoriesAvailable" 
                component={TerritoriesAvailableScreen} 
                options={{ headerTitle: 'Wolne tereny' }}
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

export default HomeNavigator;