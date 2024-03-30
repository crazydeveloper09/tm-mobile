import React, { useContext, useEffect } from 'react';
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Provider as AuthProvider } from './src/contexts/AuthContext';
import { Provider as PreacherProvider } from './src/contexts/PreachersContext';
import { Provider as TerritoryProvider } from './src/contexts/TerritoriesContext';
import { Provider as MinistryGroupProvider } from './src/contexts/MinistryGroupContext';
import { navigationRef } from './src/RootNavigation';
import SwitchNavigator from './src/navigators/SwitchNavigator';
import { Provider as SettingsProvider } from './src/contexts/SettingsContext';
import * as Updates from 'expo-updates';
import FlashMessage from 'react-native-flash-message';

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
  // Uncomment when Expo updates will be working correctly on Samsung
  /* async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  useEffect(() => {
    onFetchUpdateAsync()
  }, []) */

  if(!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <SettingsProvider>
        <PreacherProvider>
          <TerritoryProvider>
            <MinistryGroupProvider>
              <NavigationContainer ref={navigationRef}>
                <SwitchNavigator />
              </NavigationContainer>
            </MinistryGroupProvider>
          </TerritoryProvider>
        </PreacherProvider>
      </SettingsProvider>
      <FlashMessage position={'bottom'} />
    </AuthProvider>
    
  )
  
}


export default App;