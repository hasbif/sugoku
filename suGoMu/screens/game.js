import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import Board from '../components/board'


function Game({ navigation, route }) {


    return <View style={styles.container}>
        <Text> Game </Text>
        <Text> {route.params.name} </Text>
        <Board navigation={navigation} route={route} />

    </View>



}


const styles = StyleSheet.create({
    container: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
    },
});



export default Game