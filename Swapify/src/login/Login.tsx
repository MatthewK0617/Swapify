import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
// import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';


GoogleSignin.configure({
    webClientId: '265152059857-3gop4mj8d3phhv2lnv23o0b58kdvi6e2.apps.googleusercontent.com',
})

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

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


function Login(props: ChildComponentProps) {
    const { navigation, isDarkMode, loggedIn, setLoggedIn,
        userInfo, setUserInfo, savedInfo, setSavedInfo } = props;
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");

    useEffect(() => {
        if (loggedIn) navigation.navigate('Menu');
    }, [loggedIn]);

    const storeData = async (unsavedUser: { first: string, last: string, email: string }) => {
        try {
            const savedInfoString = JSON.stringify(unsavedUser);
            await AsyncStorage.setItem('userInfo', savedInfoString);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('userInfo')
            .then((userInfoJSONString) => {
                if (userInfoJSONString !== null) {
                    const userInfoParsed = JSON.parse(userInfoJSONString);
                    console.log(userInfoParsed);
                    setSavedInfo(userInfoParsed);
                    setLoggedIn(true);
                    console.log("logged in");
                } else {
                    console.log("Object not in AsyncStorage; user is most likely not logged in");
                }
            })
            .catch((err) => {
                console.error("Error in AsyncStorage userInfo retrieval: ", err);
            })
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userSigninInfo = await GoogleSignin.signIn();
            if (userSigninInfo) {
                setUserInfo(userSigninInfo);
                const userInfo2 = {
                    first: userSigninInfo.user.givenName || '',
                    last: userSigninInfo.user.familyName || '',
                    email: userSigninInfo.user.email
                }
                setSavedInfo(userInfo2);
                await storeData(userInfo2);
                setLoggedIn(true);
            } else {
                console.log("Initial sign-in information is null??");
            }
        } catch (error) {
            console.log("error");
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            setSavedInfo({
                first: '',
                last: '',
                email: '',
            });
            setUserInfo(null);
            await AsyncStorage.setItem('userInfo', "");
            setLoggedIn(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={[styles.sectionContainer, { backgroundColor: isDarkMode ? Colors.black : Colors.white, }]}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                Login
            </Text>
            <View style={styles.nameInput}>
                <TextInput
                    style={[styles.input,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    }]}
                    onChangeText={setFirst}
                    value={first}
                    placeholder='First'
                />
                <TextInput
                    style={[styles.input,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },]}
                    onChangeText={setLast}
                    value={last}
                    placeholder='Last'
                />
            </View>
            <View style={[styles.googleLogin]}>
                {!loggedIn ?
                    <TouchableOpacity onPress={signIn}>
                        <Text style={[styles.googleLoginText]}>
                            Login with Google
                        </Text>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={signOut}>
                        <Text style={[styles.googleLoginText]}>
                            Log out
                        </Text>
                    </TouchableOpacity>
                }
            </View>
            {loggedIn &&
                <View style={styles.navButton}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Menu");
                    }}>
                        <Text style={[styles.navText]}>
                            Go to Menu
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            <View>
            </View>
        </SafeAreaView >
    );
}


// Styling
const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        justifyContent: "flex-start",
        // justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    sectionTitle: {
        marginTop: '30%',
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
    nameInput: {
        flexDirection: "row",
        marginTop: 32,
        paddingHorizontal: 24,
    },
    input: {
        marginTop: 32,
        marginRight: 10,
        paddingLeft: 4,
        paddingRight: 24,
        fontSize: 20,
        width: 120,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "white",
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
    navButton: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: '8%',
        // marginRight: 10,
        padding: 16,
        fontSize: 20,
        backgroundColor: "#F7C7DB",
        borderRadius: 8,
    },
    navText: {
        fontSize: 18,
    }
});


export default Login;
