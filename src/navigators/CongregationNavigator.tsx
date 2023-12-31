import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import CongregationsInfoScreen from "../screens/congregations/InfoScreen";
import CongregationEditScreen from "../screens/congregations/EditScreen";
import MinistryGroupNewScreen from "../screens/ministryGroups/NewScreen";
import MinistryGroupEditScreen from "../screens/ministryGroups/EditScreen";

const Stack = createStackNavigator()

const CongregationsNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: headerStyles.header, headerTitleStyle: headerStyles.title , headerTintColor: 'white'}}>
            <Stack.Screen 
                name="CongInfo" 
                component={CongregationsInfoScreen} 
                options={{ headerTitle: 'Zbór' }}
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