import { types } from "../types/types";

const initialState = {
    movie: [],
    active: {
        image: '',
        tittle: '',
        description: '',
        year: '',
        categorie: '',
        duration:'',
        qualification: [],
        trailer: ''
    }
}

export const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.addMovie:
            return {
                ...state,
                movie: [action.payload, ...state.movie]
            }
        case types.loadMovie:
            return {
                ...state,
                movie: [...action.payload]
            }
        case types.activeMovie:
            return {
                ...state,
                active: {...action.payload}
            }
        case types.updateMovie:
            return {}

        case types.ListarBusqueda:
                return{
                    ...state,
                    search: [...action.payload]
                }
        default:
            return state
            
    }
        
}