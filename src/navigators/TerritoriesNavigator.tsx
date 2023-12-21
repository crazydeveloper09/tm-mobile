import { createStackNavigator } from "@react-navigation/stack";
import TerritoriesIndexScreen from "../screens/territories/IndexScreen";
import TerritoriesNewScreen from "../screens/territories/NewScreen";
import TerritoriesEditScreen from "../screens/territories/EditScreen";
import TerritoriesSearchScreen from "../screens/territories/SearchScreen";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator()

const TerritoriesNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: headerStyles.header,
            headerTitleStyle: headerStyles.title
        }}>
            <Stack.Screen 
                name="Territories list" 
                component={TerritoriesIndexScreen} 
                options={{ headerTitle: 'Tereny' }}
            />  
            <Stack.Screen 
                name="Add territory" 
                component={TerritoriesNewScreen} 
                options={{ headerTitle: 'Dodaj teren' }}
            /> 
            <Stack.Screen 
                name="Edit territory" 
                component={TerritoriesEditScreen} 
                options={{ headerTitle: 'Edytuj teren' }}
            />
            <Stack.Screen 
                name="Search territories" 
                component={TerritoriesSearchScreen} 
                options={{ headerTitle: 'Szukaj teren' }}
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
      textTransform: 'uppercase', 
      fontFamily: 'MontserratSemiBold', 
      fontSize: 20 
    }
  })

export default TerritoriesNavigator;