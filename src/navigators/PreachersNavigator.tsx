import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PreachersIndexScreen from "../screens/preachers/IndexScreen";
import PreachersNewScreen from "../screens/preachers/NewScreen";
import PreachersEditScreen from "../screens/preachers/EditScreen";
import PreachersSearchScreen from "../screens/preachers/SearchScreen";
import { StyleSheet } from "react-native";
import PreacherDeleteConfirmScreen from "../screens/preachers/DeleteConfirmScreen";
import PreacherTerritoriesScreen from "../screens/preachers/PreacherTerritoriesScreen";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const Stack = createStackNavigator()

const PreachersNavigator = () => {

    const {state, loadColor} = useContext(SettingsContext);
    useEffect(() => {
      loadColor()
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