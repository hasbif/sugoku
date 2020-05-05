import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getBoard, validateBoard } from '../store/actions/sudokuAction'

const getTime = (time) => {
    const mins = Math.floor(time / 60)
    const secs = time - mins * 60
    return { mins, secs }
}

function Board(props) {
    const { navigation, route } = props
    const [board, setBoard] = useState(null)
    const [initBoard, setInitBoard] = useState(null)
    const fetchedBoard = useSelector(state => state.board)
    const status = useSelector(state => state.status)
    const submitCount = useSelector(state => state.submitCount)
    const solution = useSelector(state => state.solution)
    const dispatch = useDispatch()
    const [firstRun, setFirstRun] = useState(true)
    const [hint, setHint] = useState(3)

    const [time, setTime] = useState(0)
    const [active, setActive] = useState(true)
    const { min, secs } = getTime(time)
    const [test, setTest] = useState(0)

    useEffect(() => {
        // let interval = null
        // if (active) {
        //     interval = setInterval(() => {
        //         setTime(time + 1)
        //     }, 1000)
        // }
        if (active) {
            setTimeout(setTime(time => time + 1), 10000)
            setTest(test + 1)
        }
    }, [test, active])

    // while (active) {
    //     setTimeout(setTime(time + 1), 1000)
    // }


    useEffect(() => {
        setInitBoard(JSON.parse(JSON.stringify(fetchedBoard)))
        setBoard(JSON.parse(JSON.stringify(fetchedBoard)))
    }, [fetchedBoard])

    function boardInput(i, j, e) {
        let inputBoard = [...board]
        inputBoard[i][j] = Number(e)
        setBoard(inputBoard)
    }

    function validate() {
        for (let i in board) {
            for (let j in board[i]) {
                if (board[i][j] == 0) {
                    return (alert('Please fill out all the blanks'))
                }
            }
        }
        dispatch(validateBoard({ board }))
    }

    useEffect(() => {
        if (!firstRun) {
            if (!(status == 'solved')) {
                alert('Wrong')
            } else {
                alert('correct')
                navigation.navigate("Finish", { name: route.params.name, win: true })
            }
        }
        setFirstRun(false)
    }, [submitCount])

    function giveUp() {
        alert('Are you sure')
        navigation.navigate("Finish", { name: route.params.name, win: false })
    }

    function fill() {
        setBoard([...solution])
    }

    function giveHint() {
        let zeros = []
        for (let i in board) {
            for (let j in board) {
                if (board[i][j] == 0) {
                    zeros.push([i, j])
                }
            }
        }
        let [idx, idy] = zeros[Math.floor(Math.random() * Math.floor(zeros.length))]
        let inputBoard = [...board]
        inputBoard[idx][idy] = solution[idx][idy]
        setBoard(inputBoard)
        setHint(hint - 1)

    }

    useEffect(() => {
        let count = 0
        for (let i in board) {
            for (let j in board[i]) {
                if (board[i][j] == solution[i][j]) {
                    count++
                }
            }
        }
        if (count == 81) {
            alert('correct')
            navigation.navigate("Finish", { name: route.params.name, win: true })
        }
    }, [board])




    return <View>

        <View style={styles.boardBox}>
            {board &&
                board.map((row, idx) => {
                    return <View key={idx} style={styles.row}>
                        {row.map((col, idy) =>
                            <View key={idy} style={initBoard[idx][idy] == 0 ? styles.box : styles.boxgray}>
                                <TextInput style={styles.input} keyboardType="numeric" value={col == "0" ? "" : col.toString()} onChangeText={(e) => boardInput(idx, idy, e)} editable={initBoard[idx][idy] == 0} />
                            </View>
                        )}
                    </View>
                })}
        </View>


        <TouchableOpacity style={styles.button} onPress={validate}>
            <Text>Check</Text>
        </TouchableOpacity>

        <Text>{solution}</Text>
        <Text>{time}</Text>


        <TouchableOpacity style={styles.button} onPress={giveUp}>
            <Text>Give Up</Text>
        </TouchableOpacity>


        <View>
            <Button onPress={giveUp} title="Give Up"></Button>
            <Button title={`Hint (${hint})`} onPress={giveHint} ></Button>
        </View>

        <Button title="fill" onPress={fill}></Button>
        <Button onPress={validate} title="Check"></Button>


        {/* disabled={hint < 1} */}


        {/* <Text>
            
            boarrrrrd
            {board}
            "\n"

                HIIII
            {initBoard}
        </Text> */}

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
        justifyContent: "center"
    },
    boxgray: {
        width: 30,
        height: 30,
        borderStyle: "solid",
        borderWidth: 1,
        backgroundColor: "lightgray"
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

export default Board