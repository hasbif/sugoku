import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux'



const winW = Dimensions.get("window").width
const winH = Dimensions.get("window").height


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







    return <View style={styles.container}>



        <Text style={{ marginTop: 50, marginBottom: 20, fontSize: 18, textAlign: "center", color: "white" }}>Time Left: {time}</Text>




        <View style={styles.boardBox}>
            {solution &&
                solution.map((row, idx) => {
                    return <View key={idx} style={styles.row}>
                        {row.map((col, idy) =>
                            <View key={idy} style={board[idx][idy] == 0 ? styles.box : styles.boxgray}>
                                <Text style={styles.input}>{col}</Text>
                            </View>
                        )}
                    </View>
                })}
        </View>

        {route.params.win ? <Text style={styles.text}>Congratulations, You've Won</Text> : <Text style={styles.text}>Better Luck Next Time</Text>}





        <Text style={{ ...styles.text, fontSize: 24, marginTop: 0 }}>{route.params.name}</Text>

        <TouchableOpacity onPress={goHome} style={{}}>
            <Text style={styles.play}>Play Again</Text>
        </TouchableOpacity>



    </View>



}



let styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        width: "100%",
        height: "100%"
    },
    boardBox: {
        alignSelf: "center",
        borderStyle: "solid",
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
        width: winW - 30,
        height: winW - 30

    },
    box: {
        width: (winW - 30) / 9,
        height: (winW - 30) / 9,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "white",
        justifyContent: "center",
        backgroundColor: "darkgray",
    },
    boxgray: {
        width: (winW - 30) / 9,
        height: (winW - 30) / 9,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: "gray",
        justifyContent: "center"
    },
    row: {
        flexDirection: "row",
        margin: 0
    },
    input: {
        alignSelf: "center",
        textAlign: "center",
        color: "white",
        fontSize: 18
    },
    text: {
        marginTop: 20,
        fontSize: 20,
        textAlign: "center",
        color: "white"
    },
    play: {
        alignSelf: "center",
        backgroundColor: "black",
        fontSize: 20,
        textAlign: "center",
        color: "white",
        borderStyle: "solid",
        borderColor: "white",
        borderRadius: 5,
        borderWidth: 3,
        marginTop: 20,
        height: 40,
        textAlignVertical: "center",
        width: 200

    }
})




export default Finish