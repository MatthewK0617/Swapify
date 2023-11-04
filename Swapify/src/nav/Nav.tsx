import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Platform,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface ChildComponentProps {
    navigation: any,
    isDarkMode: boolean,
    selected: String,
}

function Nav(props: ChildComponentProps) {
    const { navigation, isDarkMode, selected } = props;

    const checkSelected = (selected: String) => {
        if (selected == "Nav") return true;
        else return false;
    }

    return (
        <View style={[styles.sectionContainer, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>

            <TouchableOpacity style={selected == "Menu" ? styles.touchableSelected : styles.touchable} onPress={() => {
                navigation.navigate("Menu");
            }}>
                <Text style={{ ...styles.text, color: isDarkMode ? 'white' : 'black' }}>
                    Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={selected == "Settings" ? styles.touchableSelected : styles.touchable} onPress={() => {
                navigation.navigate("Settings");
            }}>
                <Text style={{ ...styles.text, color: isDarkMode ? 'white' : 'black' }}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
}

function getRelativeFontSize(size: any) {
    const baseSize = 16;
    const adjustedSize = screenWidth > 375 ? baseSize * 1.2 : baseSize;
    return adjustedSize * size;
}

const styles = StyleSheet.create({
    sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "flex-start",
        height: '100%',
        paddingTop: '3%',
        // paddingHorizontal: '30%',
        // backgroundColor: "gray",
    },
    touchable: {
        paddingHorizontal: '8%',
    },
    touchableSelected: {
        paddingHorizontal: '8%',
        backgroundColor: 'gray',
    },
    text: {
        fontSize: getRelativeFontSize(1.2),
    }
})

export default Nav;