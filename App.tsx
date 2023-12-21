import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import TerritoriesAvailableScreen from './src/screens/territories/AvailableScreen';
import TerritoriesNavigator from './src/navigators/TerritoriesNavigator';
import PreachersNavigator from './src/navigators/PreachersNavigator';
import CongregationsInfoScreen from './src/screens/congregations/InfoScreen';
import { StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { customFonts } from './src/hooks/fonts';
import AuthNavigator from './src/navigators/AuthNavigator';

const Tab = createBottomTabNavigator()
setStatusBarStyle('light')

const App = () => {
  const [fontsLoaded] = useFonts({
    'FontAwesome': require('./assets/fonts/FontAwesome.ttf'),
    'InterThin': require('./assets/fonts/inter/Inter-Thin.ttf'),
    'MontserratSemiBold': require('./assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
    'PoppinsThin': require('./assets/fonts/Poppins/Poppins-Thin.ttf')
  });

  const [isSignedIn, setIsSignedIn] = useState(false);

  if(!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      { isSignedIn ? <Tab.Navigator screenOptions={{
        headerStyle: headerStyles.header,
        headerTitleStyle: headerStyles.title,
        tabBarActiveTintColor: '#28a745',
        tabBarStyle: { padding: 10}
      }}>
        <Tab.Screen 
          name="Home"
          component={TerritoriesAvailableScreen}
          options={{
            tabBarIcon: ({color, size}) => <FontAwesome name='home' color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="Tereny"
          component={TerritoriesNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => <FontAwesome name='map-marker' color={color} size={size} />
            
          }}
        />
        <Tab.Screen 
          name="Głosiciele"
          component={PreachersNavigator}
          options={{
            tabBarIcon: ({color, size}) => <FontAwesome name='user' color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="Zbór"
          component={CongregationsInfoScreen}
          options={{
            tabBarIcon: ({color, size}) => <FontAwesome name='users' color={color} size={size} />
          }}
        />
      </Tab.Navigator> : <AuthNavigator /> }
      
  </NavigationContainer>
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
export default App;