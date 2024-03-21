import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TerritoriesIndexScreen from "../screens/territories/IndexScreen";
import TerritoriesNewScreen from "../screens/territories/NewScreen";
import TerritoriesEditScreen from "../screens/territories/EditScreen";
import TerritoriesSearchScreen from "../screens/territories/SearchScreen";
import { StatusBar, StyleSheet } from "react-native";
import TerritoriesHistoryScreen from "../screens/territories/HistoryScreen";
import TerritoryDeleteConfirmScreen from "../screens/territories/DeleteConfirmScreen";
import { Context as SettingsContext } from "../contexts/SettingsContext";


const Stack = createStackNavigator()

const TerritoriesNavigator = () => {

    const {state, loadColor} = useContext(SettingsContext);
    useEffect(() => {
      loadColor()
      StatusBar.setBackgroundColor(state.mainColor)
    }, [state.mainColor])

    return (
        <Stack.Navigator screenOptions={{
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