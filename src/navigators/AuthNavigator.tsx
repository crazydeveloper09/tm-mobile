import { createStackNavigator } from "@react-navigation/stack";
import CongregationsLoginScreen from "../screens/congregations/LoginScreen";
import CongregationsTwoFactorScreen from "../screens/congregations/TwoFactorScreen";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator()

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: headerStyles.header,
            headerTitleStyle: headerStyles.title
        }}>
            <Stack.Screen 
                name="Log in" 
                component={CongregationsLoginScreen} 
                options={{ headerTitle: 'Logowanie' }}
            />  
            <Stack.Screen 
                name="Two Factor verification" 
                component={CongregationsTwoFactorScreen} 
                options={{ headerTitle: 'Dwustopniowa weryfikacja' }}
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

export default AuthNavigator;