import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Board from '../components/board'


function Game({ navigation, route }) {


    return <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Board navigation={navigation} route={route} />
        </ScrollView>


    </View>



}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",

        alignSelf: "center",
        width: "100%",
        height: "100%"
    },
    contentContainer: {
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});



export default Game