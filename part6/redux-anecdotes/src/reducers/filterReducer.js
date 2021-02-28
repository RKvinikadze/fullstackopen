import { act } from "react-dom/test-utils"

export const filter = (currentValue) => {
    return {
        type: 'search',
        data: {currentValue}
    }
}

const reducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch(action.type){
        case 'search':
            return action.data.currentValue
        default: return state
    }

    return state
}

export default reducer