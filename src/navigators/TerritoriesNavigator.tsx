import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TerritoriesIndexScreen from "../screens/territories/Index";
import TerritoriesNewScreen from "../screens/territories/New";
import TerritoriesEditScreen from "../screens/territories/Edit";
import TerritoriesSearchScreen from "../screens/territories/Search";
import { StatusBar, StyleSheet } from "react-native";
import TerritoriesHistoryScreen from "../screens/territories/History";
import TerritoryDeleteConfirmScreen from "../screens/territories/DeleteConfirm";
import { Context as SettingsContext } from "../contexts/SettingsContext";


const Stack = createStackNavigator()

const TerritoriesNavigator = () => {

    const {state, loadColor} = useContext(SettingsContext);
    useEffect(() => {
      StatusBar.setBackgroundColor(state.mainColor)
    }, [state.mainColor])

    return (
        <Stack.Navigator initialRouteName='Territories List' screenOptions={{
            headerStyle: { backgroundColor: state?.mainColor },
            headerTitleStyle: headerStyles.title,
            headerTintColor: 'white'
        }}>
            
            <Stack.Screen 
                name="TerritoriesList" 
                component={TerritoriesIndexScreen} 
                options={{ headerTitle: 'Tereny' }}
            />  
            <Stack.Screen 
                name="AddTerritory" 
                component={TerritoriesNewScreen} 
                options={{ headerTitle: 'Dodaj teren' }}
            /> 
            <Stack.Screen 
                name="TerritoryHistory" 
                component={TerritoriesHistoryScreen} 
                options={{ headerTitle: 'Historia terenu' }}
            /> 
            <Stack.Screen 
                name="EditTerritory" 
                component={TerritoriesEditScreen} 
                options={{ headerTitle: 'Edytuj teren'}}
            />
            <Stack.Screen 
                name="SearchTerritories" 
                component={TerritoriesSearchScreen} 
                options={{ headerTitle: 'Szukaj teren' }}
            />  
            <Stack.Screen 
                name="DeleteConfirmTerritory" 
                component={TerritoryDeleteConfirmScreen} 
                options={{ headerTitle: 'Potwierdź usunięcie' }}
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

export default TerritoriesNavigator;