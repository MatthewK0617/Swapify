/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
*/


import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/login/Login';
import Menu from './src/menu/Menu';

const Stack = createStackNavigator();
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [savedInfo, setSavedInfo] = useState({
    first: '',
    last: '',
    email: '',
  });


  return (
    <SafeAreaView style={styles.navContainer}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animationEnabled: false,
          }}
        >
          {/* Define your screens here */}
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <Login
              navigation={useNavigation()} isDarkMode={isDarkMode}
              loggedIn={loggedIn} setLoggedIn={setLoggedIn}
              userInfo={userInfo} setUserInfo={setUserInfo}
              savedInfo={savedInfo} setSavedInfo={setSavedInfo}
            />}
          </Stack.Screen>
          <Stack.Screen name="Menu" options={{ headerShown: false }}>
            {() => <Menu
              navigation={useNavigation()} isDarkMode={isDarkMode}
              loggedIn={loggedIn} setLoggedIn={setLoggedIn}
              userInfo={userInfo} setUserInfo={setUserInfo}
              savedInfo={savedInfo} setSavedInfo={setSavedInfo}
            />}
          </Stack.Screen>
          {/* Add more screens as needed */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


export default App;
