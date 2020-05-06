const url = "https://sugoku.herokuapp.com/"
const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
const encodeParams = (params) =>
    Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');


export const getBoard = (difficulty) => {
    return dispatch => {
        let initBoard
        return fetch(url + "board?difficulty=" + difficulty)
            .then(res => res.json())
            .then(data => {
                initBoard = data.board
                return data
            }).then(board => {
                console.log(board)
                fetch('https://sugoku.herokuapp.com/solve', {
                    method: 'POST',
                    body: encodeParams(board),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(res => res.json())
                    .then(data => {
                        dispatch({
                            type: "SET_BOARD",
                            payload: { init: initBoard, solution: data.solution, level: data.difficulty }
                        })
                    })
            })
    }
}



export const validateBoard = (board) => {
    return dispatch => {
        return fetch(url + 'solve', {
            method: 'POST',
            body: encodeParams(board),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(res => res.json())
            .then(data => {
                dispatch({
                    type: "SET_STATUS",
                    payload: data.status
                })
            })
    }
}