const initialState = {
    board: [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]],
    solution: [],
    status: "",
    level: "",
}

export default function sudokuReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_BOARD":
            console.log('hi set board', action)
            return { ...state, board: action.payload.init, solution: action.payload.solution, level: action.payload.level }
        case "SET_STATUS":
            return { ...state, status: action.payload }
        default:
            console.log('defaulsd')
            return state
    }
}