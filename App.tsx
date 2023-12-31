import React, { useContext } from 'react';
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Provider as AuthProvider } from './src/contexts/AuthContext';
import { Provider as PreacherProvider } from './src/contexts/PreachersContext';
import { Provider as TerritoryProvider } from './src/contexts/TerritoriesContext';
import { Provider as MinistryGroupProvider } from './src/contexts/MinistryGroupContext';
import { navigationRef } from './src/RootNavigation';
import SwitchNavigator from './src/navigators/SwitchNavigator';


setStatusBarStyle('light')

const App = () => {

  const [fontsLoaded] = useFonts({
    'FontAwesome': require('./assets/fonts/FontAwesome.ttf'),
    'InterThin': require('./assets/fonts/inter/Inter-Thin.ttf'),
    'InterRegular': require('./assets/fonts/inter/Inter-Regular.ttf'),
    'InterSemiBold': require('./assets/fonts/inter/Inter-SemiBold.ttf'),
    'MontserratRegular': require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
    'MontserratSemiBold': require('./assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
    'PoppinsThin': require('./assets/fonts/Poppins/Poppins-Thin.ttf'),
    'PoppinsSemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'PoppinsRegular': require('./assets/fonts/Poppins/Poppins-Regular.ttf')
  });

  if(!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <PreacherProvider>
        <TerritoryProvider>
          <MinistryGroupProvider>
            <NavigationContainer ref={navigationRef}>
              <SwitchNavigator />
            </NavigationContainer>
          </MinistryGroupProvider>
        </TerritoryProvider>
      </PreacherProvider>
    </AuthProvider>
    
  )
  
}


export default App;