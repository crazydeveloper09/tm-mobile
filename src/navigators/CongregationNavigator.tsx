import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import CongregationsInfoScreen from "../screens/congregations/InfoScreen";
import CongregationEditScreen from "../screens/congregations/EditScreen";
import MinistryGroupNewScreen from "../screens/ministryGroups/NewScreen";
import MinistryGroupEditScreen from "../screens/ministryGroups/EditScreen";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import CongregationActivityScreen from "../screens/congregations/ActivityScreen";

const Stack = createStackNavigator()

const CongregationsNavigator = () => {

    const {state, loadColor} = useContext(SettingsContext);
    useEffect(() => {
      loadColor()
    }, [state.mainColor])
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: state?.mainColor }, headerTitleStyle: headerStyles.title , headerTintColor: 'white'}}>
            <Stack.Screen 
                name="CongInfo" 
                component={CongregationsInfoScreen} 
                options={{ headerTitle: 'Zbór' }}
            />
            <Stack.Screen 
                name="CongActivity" 
                component={CongregationActivityScreen} 
                options={{ headerTitle: 'Kto i kiedy się logował?' }}
            />   
            <Stack.Screen 
                name="EditCong" 
                component={CongregationEditScreen} 
                options={{ headerTitle: 'Edytuj zbór' }}
            />
            <Stack.Screen 
                name="AddMinistryGroup" 
                component={MinistryGroupNewScreen} 
                options={{ headerTitle: 'Dodaj grupę służby' }}
            /> 
    
            <Stack.Screen 
                name="EditMinistryGroup" 
                component={MinistryGroupEditScreen} 
                options={{ headerTitle: 'Edytuj grupę służby' }}
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

export default CongregationsNavigator;