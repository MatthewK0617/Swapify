import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Nav from '../nav/Nav';

GoogleSignin.configure({
    webClientId: '265152059857-3gop4mj8d3phhv2lnv23o0b58kdvi6e2.apps.googleusercontent.com',
})

interface ChildComponentProps {
    navigation: any,
    isDarkMode: boolean,
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: any | null; // Adjust the type based on your data structure
    setUserInfo: React.Dispatch<React.SetStateAction<any | null>>;
}

function Settings(props: ChildComponentProps): JSX.Element {
    const { navigation, isDarkMode, loggedIn, setLoggedIn,
        userInfo, setUserInfo } = props;

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            setUserInfo(null);
            await AsyncStorage.setItem('userInfo', "");
            console.log("Signed out")
            setLoggedIn(false);
            navigation.navigate("Login");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={[styles.sectionContainer, { backgroundColor: isDarkMode ? Colors.black : Colors.white, }]}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                Settings
            </Text>
            {userInfo &&
                <View style={[styles.userInfoView, { backgroundColor: isDarkMode ? Colors.light : Colors.dark }]}>
                    <Text style={styles.userInfo}>{userInfo[0].first} {userInfo[0].last}</Text>
                </View>
            }
            <View style={styles.navButton}>
                <TouchableOpacity onPress={signOut}>
                    <Text style={[styles.googleLoginText]}>
                        Log out
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomNav}>
                <Nav navigation={navigation} isDarkMode={isDarkMode} selected={"Settings"} />
            </View>
        </View>
    );
}


// Styling
const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // maxHeight: '100%',
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
    userInfoView: {
        marginTop: 32,
        justifyContent: "center",
        alignItems: "center",
        height: '10%',
        padding: 10,
        maxWidth: '60%',
    },
    userInfo: {
        fontSize: 20,
    },
    navButton: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: '8%',
        padding: 16,
        fontSize: 20,
        backgroundColor: "#F7C7DB",
        borderRadius: 8,
    },
    navText: {
        fontSize: 18,
    },
    bottomNav: {
        position: 'absolute',
        justifyContent: "flex-end",
        borderTopWidth: 0.5,
        borderColor: 'white',
        height: '10%',
        width: '100%',
        backgroundColor: 'black',
        bottom: 0,
    },
    googleLogin: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: '40%',
        // marginRight: 10,
        padding: 16,
        fontSize: 20,
        backgroundColor: "#92BFB1",
        borderRadius: 8,
        // borderBottomWidth: 1,
        // borderBottomColor: "white",
    },
    googleLoginText: {
        fontSize: 24,
    },
});


export default Settings;
