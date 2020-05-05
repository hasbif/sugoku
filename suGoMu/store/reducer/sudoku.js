const initialState = {
    board: [],
    solution: [],
    status: "solved",
    submitCount: 0,
}

export default function sudokuReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_BOARD":
            console.log('hi set board', action)
            return { ...state, board: action.payload.init, solution: action.payload.solution }
        case "SET_STATUS":
            return { ...state, status: action.payload, submitCount: state.submitCount + 1 }
        default:
            console.log('defaulsd')
            return state
    }
}