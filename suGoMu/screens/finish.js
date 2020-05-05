import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'


function format(time) {
    let mins = Math.floor(time / 60)
    let secs = time - mins * 60
    mins = mins < 10 ? '0' + mins : String(mins)
    secs = secs < 10 ? '0' + secs : String(secs)
    return mins + ':' + secs
}


function Finish({ navigation, route }) {

    function goHome() {
        navigation.navigate('Home')
    }

    const board = useSelector(state => state.board)
    const solution = useSelector(state => state.solution)
    const seconds = route.params.time
    const time = format(seconds)
    console.log(route.params)







    return <View>
        <Text> Finish</Text>
        <Text> {JSON.stringify(route.params.name)} </Text>
        <Button title="Home" onPress={goHome} />
        {route.params.win ? <Text>SUGOI, {route.params.name} senpai won, aaaaa</Text>
            :
            <Text>It's Ok {route.params.name}, i believe in you, next time youll get it</Text>}

        {route.params.win ? <Text>You won in {time}</Text>
            :
            <Text>You gave up after {time} passed</Text>}




        <View style={styles.boardBox}>
            {solution &&
                solution.map((row, idx) => {
                    return <View key={idx} style={styles.row}>
                        {row.map((col, idy) =>
                            <View key={idy} style={board[idx][idy] == 0 ? styles.box : styles.boxgray}>
                                <Text>{col}</Text>
                            </View>
                        )}
                    </View>
                })}
        </View>



    </View>



}



let styles = StyleSheet.create({
    boardBox: {
        alignSelf: "center"
    },
    box: {
        width: 30,
        height: 30,
        borderStyle: "solid",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    boxgray: {
        width: 30,
        height: 30,
        borderStyle: "solid",
        borderWidth: 1,
        backgroundColor: "lightgray",
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        margin: 0
    },
    input: {
        alignSelf: "center",
        textAlign: "center",
        width: 25
    },
    button: {
        width: 90
    }
})




export default Finish