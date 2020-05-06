import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getBoard, validateBoard } from '../store/actions/sudokuAction'




const winW = Dimensions.get("window").width
const winH = Dimensions.get("window").height

const getTime = (time) => {
    const mins = Math.floor(time / 60)
    const secs = time - mins * 60
    return { mins, secs }
}

function Board(props) {
    const solution = useSelector(state => state.solution)
    const dispatch = useDispatch()
    const { navigation, route } = props
    const [board, setBoard] = useState(null)
    const [initBoard, setInitBoard] = useState(null)
    const fetchedBoard = useSelector(state => state.board)
    const status = useSelector(state => state.status)
    const [firstRun, setFirstRun] = useState(true)
    const [hint, setHint] = useState(3)
    const [time, setTime] = useState(600)
    const [active, setActive] = useState(false)
    const { mins, secs } = getTime(time)

    const [submit, setSubmit] = useState(0)
    const [loading, setLoading] = useState(true)

    //time
    useEffect(() => {
        if (active) {
            setTimeout(() => { setTime(time - 1) }, 1000)
        }
        if (time == 0) {
            setActive(false)
            navigation.navigate("Finish", { name: route.params.name, win: false, time })
        }
    }, [time, active])

    //fetch board
    useEffect(() => {
        setLoading(true)
        dispatch(getBoard(route.params.level)).then(() => {
            setActive(true)
            setLoading(false)
        })
    }, [])
    //set board when fetched
    useEffect(() => {
        setInitBoard(JSON.parse(JSON.stringify(fetchedBoard)))
        setBoard(JSON.parse(JSON.stringify(fetchedBoard)))
    }, [fetchedBoard])

    //input to board
    function boardInput(i, j, e) {
        let inputBoard = [...board]
        inputBoard[i][j] = Number(e)
        setBoard(inputBoard)
    }
    //validate board
    function validate() {
        for (let i in board) {
            for (let j in board[i]) {
                if (board[i][j] == 0) {
                    return (alert('Please fill out all the blanks'))
                }
            }
        }
        dispatch(validateBoard({ board })).then(() => {
            setSubmit(submit + 1)
        })
    }

    //alert after valiadtion
    useEffect(() => {
        if (!firstRun) {
            if ((status !== 'solved')) {
                alert('Incorrect, Try Again')
            } else {
                alert('Correct')
                navigation.navigate("Finish", { name: route.params.name, win: true, time })
            }
        }
        setFirstRun(false)
    }, [submit])

    //give up
    function giveUp() {
        // alert('Are you sure')
        setActive(false)
        navigation.navigate("Finish", { name: route.params.name, win: false, time })
    }

    function fill() {
        setBoard([...solution])
    }


    //give hint
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


    //reset
    function reset() {
        setBoard(JSON.parse(JSON.stringify(initBoard)))
    }


    return <View>



        <View style={styles.top}>
            <Text style={styles.topBox}>{mins < 10 ? `0` + mins : mins}:{secs < 10 ? `0` + secs : secs}</Text>
            <Text style={{ color: "white", fontSize: 14, alignSelf: "center" }}>{route.params.level.toUpperCase()}</Text>
            <TouchableOpacity onPress={reset}><Text style={styles.topBox}>Reset</Text></TouchableOpacity>
        </View>


        <View style={styles.boardBox}>
            {loading ? <Image source={require('../assets/loading.gif')} style={{ width: 300, height: 300 }} /> :
                board &&
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



        {/* <TouchableOpacity onPress={fill}><Text style={{ color: "white" }}>win</Text></TouchableOpacity> */}

        <View style={styles.bot}>
            <TouchableOpacity onPress={giveUp}><Text style={styles.botBox}>Give Up</Text></TouchableOpacity>
            <TouchableOpacity onPress={validate}><Text style={styles.botCheck}>Check</Text></TouchableOpacity>
            <TouchableOpacity onPress={giveHint} disabled={hint < 1}><Text style={styles.botBox}>{`Hint (${hint})`}</Text></TouchableOpacity>
        </View>


    </View>


}

let styles = StyleSheet.create({
    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },
    topBox: {
        width: 70,
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
        fontSize: 14,
        borderRadius: 4
    },
    bot: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 60
    },
    botBox: {
        width: 90,
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
        fontSize: 18,
        borderRadius: 4
    },
    botCheck: {
        width: 160,
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
        fontSize: 22,
        borderRadius: 4
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
})

export default Board