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

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
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

function Menu(props: ChildComponentProps): JSX.Element {
    const { navigation, isDarkMode, loggedIn, setLoggedIn,
        userInfo, setUserInfo } = props;

    useEffect(() => {
        console.log(userInfo);
    }, [userInfo])

    return (
        <View style={[styles.sectionContainer, { backgroundColor: isDarkMode ? Colors.black : Colors.white, }]}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                Welcome!
            </Text>
            {userInfo &&
                <View style={[styles.userInfoView, { backgroundColor: isDarkMode ? Colors.light : Colors.dark }]}>
                    <Text style={styles.userInfo}>{userInfo[0].first} {userInfo[0].last}</Text>
                </View>
            }
            <View style={styles.bottomNav}>
                <Nav navigation={navigation} isDarkMode={isDarkMode} selected={"Menu"} />
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
    }
});


export default Menu;
