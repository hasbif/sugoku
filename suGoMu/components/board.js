import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';



function Board() {

    const [board, setBoard] = useState(null)
    const [initBoard, setInitBoard] = useState(null)
    const [text, setText] = useState("")


    useEffect(() => {
        fetch("https://sugoku.herokuapp.com/board?difficulty=easy")
            .then(res => res.json())
            .then(data => {
                setInitBoard(JSON.parse(JSON.stringify(data.board)))
                setBoard(JSON.parse(JSON.stringify(data.board)))
                // setInitBoard([...data.board])
                // setBoard([...data.board])
            }).catch(err => {
                console.log('errr', err)
            })
    }, [])

    function boardInput(i, j, e) {
        let inputBoard = [...board]
        inputBoard[i][j] = Number(e)
        setBoard(inputBoard)
        console.log(JSON.stringify(inputBoard))
        console.log(JSON.stringify(board))
        console.log(JSON.stringify(initBoard))
        // board[i][j] = e
        // board[i][j] = e


        // let newBoard = board
        // newBoard[j][i] = e
        // console.log(e)
        // setBoard(newBoard)
    }

    const [test, setTest] = useState('')
    function testInput(e) {
        // let inputBoard = [...board]
        // inputBoard[0][1] = e
        // setBoard(inputBoard)
        setTest(e)
    }




    return <View>


        <TextInput keyboardType="numeric" value={test} onChangeText={(e) => testInput(e)} />



        <View style={styles.boardBox}>
            {board &&
                board.map((row, idx) => {
                    return <View key={idx} style={styles.row}>
                        {row.map((col, idy) =>
                            <View key={idy} style={initBoard[idx][idy] == 0 ? styles.box : { ...styles.box, backgroundColor: "lightgray" }}>
                                <TextInput style={styles.input} keyboardType="numeric" value={col == "0" ? "" : col.toString()} onChangeText={(e) => boardInput(idx, idy, e)} editable={initBoard[idx][idy] == 0} />
                                {/* {initBoard[idx][idy] == '0' ?
                                    <TextInput key={idy} keyboardType="numeric" value={col == "0" ? "" : col.toString()} onChangeText={(e) => boardInput(idx, idy, e)} editable={initBoard[idx][idy] == 0} />
                                    : <Text>{col}</Text>} */}
                            </View>
                        )}
                    </View>

                })}

        </View>

        <Text>
            {test}
            {board}
            "\n"

                HIIII
            {initBoard}
        </Text>











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
        textAlign: "center"
    },
})

export default Board