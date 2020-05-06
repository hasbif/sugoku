import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';

const winW = Dimensions.get("window").width
const winH = Dimensions.get("window").height

function Home({ navigation, route }) {

    const [name, setName] = useState('')


    function press(level) {
        if (name == "") {
            alert('Please fill out your name before continuing')
        } else {
            navigation.navigate("Sudoku", { name, level })
        }
    }


    return <View styles={styles.container}>

        <View style={styles.box}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.head}> SUDOKU </Text>

                <KeyboardAvoidingView
                // behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <View style={styles.form}>
                        <Text style={styles.label}>Please Enter Your Name</Text>
                        <TextInput onChangeText={text => setName(text)} style={styles.input} />
                    </View>
                </KeyboardAvoidingView>


                <TouchableOpacity onPress={() => press('easy')} style={styles.easy}><Text style={styles.text}>EASY</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => press('medium')} style={styles.medium}><Text style={styles.text}>MEDIUM</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => press('hard')} style={styles.hard}><Text style={styles.text}>HARD</Text></TouchableOpacity>

            </ScrollView>
        </View>


    </View>



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        backgroundColor: 'black',
        width: winW,
        alignSelf: 'center',
        height: '100%',
    },
    label: {
        alignSelf: "center",
        marginBottom: winH * .01,
        color: "white"

    },
    form: {
        alignSelf: "center",
        marginHorizontal: winW * .1,
        marginVertical: winH * .04,
    },
    input: {
        backgroundColor: "white",
        width: winW * .8,
        textAlign: "center",
        height: winH * .05,
        borderRadius: 20

    },
    easy: {
        backgroundColor: "white",
        borderStyle: "solid",
        marginHorizontal: winW * .1,
        marginVertical: winH * .01,
        height: winH * .1,
        justifyContent: "center",
        borderRadius: 20

    },
    medium: {
        backgroundColor: "lightgray",
        borderStyle: "solid",
        marginHorizontal: winW * .1,
        marginVertical: winH * .01,
        height: winH * .1,
        justifyContent: "center",
        borderRadius: 20
    },
    hard: {
        backgroundColor: "darkgray",
        borderStyle: "solid",
        marginHorizontal: winW * .1,
        marginVertical: winH * .01,
        height: winH * .1,
        justifyContent: "center",
        marginBottom: winH * .1,
        borderRadius: 20
    },
    text: {
        textAlign: "center",
        fontSize: winH * .03,
        fontWeight: 'bold'
    },
    head: {
        textAlign: "center",
        fontSize: winH * .07,
        color: "white",
        fontWeight: 'bold'
    },
    contentContainer: {
        marginTop: winH * .2
    },
});



export default Home