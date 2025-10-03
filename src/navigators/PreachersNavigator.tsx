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
import { preachersTranslations } from "../screens/preachers/translations";
import useLocaLization from "../hooks/useLocalization";

const Stack = createStackNavigator()

const PreachersNavigator = () => {

    const {state} = useContext(SettingsContext);
    const preacherTranslate = useLocaLization(preachersTranslations)
    
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: state?.mainColor }, headerTitleStyle: headerStyles.title, headerTintColor: 'white'}}>
            <Stack.Screen 
                name="PreachersList" 
                component={PreachersIndexScreen} 
                options={{ headerTitle: preacherTranslate.t("sectionText") }}
            />  
            <Stack.Screen 
                name="AddPreacher" 
                component={PreachersNewScreen} 
                options={{ headerTitle: preacherTranslate.t("addButtonText") }}
            /> 
            <Stack.Screen 
                name="EditPreacher" 
                component={PreachersEditScreen} 
                options={{ headerTitle: preacherTranslate.t("editButtonText") }}
            />
            <Stack.Screen 
                name="SearchPreacher" 
                component={PreachersSearchScreen} 
                options={{ headerTitle: preacherTranslate.t("searchPreacherHeader") }}
            /> 
            <Stack.Screen 
                name="PreacherTerritories" 
                component={PreacherTerritoriesScreen} 
                options={{ headerTitle: preacherTranslate.t("preacherTerritoriesHeader") }}
            />  
            <Stack.Screen 
                name="DeleteConfirmPreacher" 
                component={PreacherDeleteConfirmScreen} 
                options={{ headerTitle: preacherTranslate.t("deleteConfirmHeader") }}
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