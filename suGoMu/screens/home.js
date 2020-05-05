import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
// import { setWorldAlignment } from 'expo/build/AR';
import { useDispatch } from 'react-redux'
import { getBoard } from '../store/actions/sudokuAction'


function Home({ navigation, route }) {

    const [name, setName] = useState('')
    const dispatch = useDispatch()
    console.log(route.params)

    function press(level) {
        console.log(level, 'ads')
        // console.log(name)

        if (name == "") {
            alert('Please fill out your name before continuing')
        } else {
            dispatch(getBoard(level))
                .then(() => {
                    navigation.navigate("Sudoku", {
                        name
                    })
                })
        }
    }


    return <View styles={styles.container}>
        <Text> Home </Text>
        <Text>Please Enter Your Name Here</Text>
        <TextInput onChangeText={text => setName(text)} />

        <Button title="EASY" onPress={() => press('easy')} ></Button>
        <Button title="MEDIUM" onPress={() => press('medium')} ></Button>
        <Button title="HARD" onPress={() => press('hard')} ></Button>

    </View>



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        alignSelf: "center"

    },
    form: {
        alignSelf: "center"
    }
});



export default Home