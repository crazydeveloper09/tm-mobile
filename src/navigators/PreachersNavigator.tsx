import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PreachersIndexScreen from "../screens/preachers/Index";
import PreachersNewScreen from "../screens/preachers/New";
import PreachersEditScreen from "../screens/preachers/Edit";
import PreachersSearchScreen from "../screens/preachers/Search";
import { StatusBar, StyleSheet } from "react-native";
import PreacherDeleteConfirmScreen from "../screens/preachers/DeleteConfirm";
import PreacherTerritoriesScreen from "../screens/preachers/PreacherTerritories";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const Stack = createStackNavigator()

const PreachersNavigator = () => {

    const {state, loadColor} = useContext(SettingsContext);
    useEffect(() => {
      loadColor()
      StatusBar.setBackgroundColor(state.mainColor)
    }, [state.mainColor])
    
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: state?.mainColor }, headerTitleStyle: headerStyles.title, headerTintColor: 'white'}}>
            <Stack.Screen 
                name="PreachersList" 
                component={PreachersIndexScreen} 
                options={{ headerTitle: 'Głosiciele' }}
            />  
            <Stack.Screen 
                name="AddPreacher" 
                component={PreachersNewScreen} 
                options={{ headerTitle: 'Dodaj głosiciela' }}
            /> 
            <Stack.Screen 
                name="EditPreacher" 
                component={PreachersEditScreen} 
                options={{ headerTitle: 'Edytuj głosiciela' }}
            />
            <Stack.Screen 
                name="SearchPreacher" 
                component={PreachersSearchScreen} 
                options={{ headerTitle: 'Szukaj głosiciela' }}
            /> 
            <Stack.Screen 
                name="PreacherTerritories" 
                component={PreacherTerritoriesScreen} 
                options={{ headerTitle: 'Tereny głosiciela' }}
            />  
            <Stack.Screen 
                name="DeleteConfirmPreacher" 
                component={PreacherDeleteConfirmScreen} 
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

export default PreachersNavigator;