import { createStackNavigator } from "@react-navigation/stack";
import PreachersIndexScreen from "../screens/preachers/IndexScreen";
import PreachersNewScreen from "../screens/preachers/NewScreen";
import PreachersEditScreen from "../screens/preachers/EditScreen";
import PreachersSearchScreen from "../screens/preachers/SearchScreen";

const Stack = createStackNavigator()

const PreachersNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen 
                name="Preachers list" 
                component={PreachersIndexScreen} 
                options={{ headerTitle: 'Głosiciele' }}
            />  
            <Stack.Screen 
                name="Add preacher" 
                component={PreachersNewScreen} 
                options={{ headerTitle: 'Dodaj głosiciela' }}
            /> 
            <Stack.Screen 
                name="Edit Preacher" 
                component={PreachersEditScreen} 
                options={{ headerTitle: 'Edytuj głosiciela' }}
            />
            <Stack.Screen 
                name="Search Preacher" 
                component={PreachersSearchScreen} 
                options={{ headerTitle: 'Szukaj głosiciela' }}
            />  
            
        </Stack.Navigator>
    )
}

export default PreachersNavigator;