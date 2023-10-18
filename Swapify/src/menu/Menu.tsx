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


GoogleSignin.configure({
    webClientId: '265152059857-3gop4mj8d3phhv2lnv23o0b58kdvi6e2.apps.googleusercontent.com',
})

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView } from 'react-native-safe-area-context';


interface ChildComponentProps {
    navigation: any,
    isDarkMode: boolean,
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: any | null; // Adjust the type based on your data structure
    setUserInfo: React.Dispatch<React.SetStateAction<any | null>>;
    savedInfo: {
        first: string;
        last: string;
        email: string;
    };
    setSavedInfo: React.Dispatch<
        React.SetStateAction<{
            first: string;
            last: string;
            email: string;
        }>
    >;
}

function Menu(props: ChildComponentProps): JSX.Element {
    const { navigation, isDarkMode, loggedIn, setLoggedIn,
        userInfo, setUserInfo, savedInfo, setSavedInfo } = props;

    return (
        <SafeAreaView style={[styles.sectionContainer, { backgroundColor: isDarkMode ? Colors.black : Colors.white, }]}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                Welcome!
            </Text>
            <View style={[styles.userInfoView, { backgroundColor: isDarkMode ? Colors.light : Colors.dark }]}>
                <Text style={styles.userInfo}>{savedInfo.first} {savedInfo.last}</Text>
            </View>
            <View style={styles.navButton}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Login");
                }}>
                    <Text style={[styles.navText]}>
                        Go to Login
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
            </View>
        </SafeAreaView>
    );
}


// Styling
const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    }
});


export default Menu;
