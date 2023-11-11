/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
*/
import React, { useEffect, useState } from 'react';
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
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Config } from 'react-native-config';
import io from "socket.io-client";

import Login from './src/login/Login';
import Menu from './src/menu/Menu';
import Settings from './src/settings/Settings';

const Stack = createStackNavigator();
function App(): JSX.Element {
  const URL = Config.REACT_APP_URL || "http://localhost:8000/";
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [socket, setSocket] = useState<any | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [queryKey, setQueryKey] = useState({
    first: '',
    last: '',
    email: '',
  });

  const [userInfo, setUserInfo] = useState<any | null>(null);
  // either initialize userInfo to have loginInfo with all info marked as blank,
  // or just keep this as is because it will update since there can be any type 

  useEffect(() => {
    console.log(`${Config.REACT_APP_URL}`);
    console.log(Config)
    const fetchData = async () => {
      const queryString = await AsyncStorage.getItem('userInfo');
      if (queryString) {
        const query = JSON.parse(queryString);
        console.log("query:", query);
        Axios.get(`${URL}login`, {
          params: { gmail: query.email }
        }).then((res) => {
          console.log(res.data);
          if (res.data.length != 0) {
            setLoggedIn(true);
            setUserInfo(res.data);
          }
        }).catch((err) => { console.log("initial login", err) });
      }
    }

    fetchData();
    // load queryKey copy from local storage. 
    // if exists, then search the db and pull data
    // else show the login page (continue as normal)
  }, [])

  useEffect(() => {
    const socket1 = io(URL);
    setSocket(socket1);

    socket1.on("connect", () => {
      console.log(socket1.id, "connected")
    })
    socket1.on("reconnect_failed", () => {
      console.log(socket1.disconnected)
    });
    // socket1.on("disconnect", () => {
    //   console.log(socket.id, "disconnected")
    // })
    return () => {
      socket1.disconnect();
    }
  }, [URL])

  return (
    <View style={styles.navContainer}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animationEnabled: false,
          }}
        >
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <Login
              navigation={useNavigation()} isDarkMode={isDarkMode}
              loggedIn={loggedIn} setLoggedIn={setLoggedIn}
              userInfo={userInfo} setUserInfo={setUserInfo}
            />}
          </Stack.Screen>
          <Stack.Screen name="Menu" options={{ headerShown: false }}>
            {() => <Menu
              navigation={useNavigation()} isDarkMode={isDarkMode}
              loggedIn={loggedIn} setLoggedIn={setLoggedIn}
              userInfo={userInfo} setUserInfo={setUserInfo}
            />}
          </Stack.Screen>
          <Stack.Screen name="Settings" options={{ headerShown: false }}>
            {() => <Settings
              navigation={useNavigation()} isDarkMode={isDarkMode}
              loggedIn={loggedIn} setLoggedIn={setLoggedIn}
              userInfo={userInfo} setUserInfo={setUserInfo}
            />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}


const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    // backgroundColor: "gray",
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


/**
 * Tasks:
 * Front-end: Create interfaces for the map (will probably depend on an API).
 *  Look into the API I found the other day. Make logged-in state persist on
 *  app loading. Implement settings and necessary information. The necessary 
 *  information inputs should precede the login page. 
 * Back-end: look into NoSQL (MongoDB) for user data. Learn more about NoSQL
 *  and differences with SQL.
 */