const initialState = {
    pokemon: [],
    pokemons: [], // Este es el arreglo que modifico en los filtros
    pokemonsFiltered: [], // Este es el arreglo que se mantiene sin cambios
    pokemonsTypes: []
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_POKEMONS':
            return{
                ...state,
                pokemons: action.payload,
                pokemonsFiltered: action.payload
            }

        case 'GET_POKE':
            let fullPoke = state.pokemonsFiltered;
            let onePoke = fullPoke.filter(p => p.name === action.payload )
            let noPoke = fullPoke
            return{
                ...state,
                pokemons: onePoke.length ? onePoke : noPoke.concat(alert("No hay ningun pokemon con ese nombre. Mostrando todos los pokemons:"))
            }

        case 'GET_POKE':
            return {
                ...state,
                pokemonsTypes: action.payload
            }

        case 'GET_DETAILS':
            return {
                ...state,
                pokemon: action.payload
            }

        case 'RELOAD':
            return{
                ...state,
                pokemons: state.pokemonsFiltered
            }

        case 'ORDER_BY_ABC':
            let orderPokemons = action.payload === "asc"
            return {
            }
        default:
            return state
    }
}
export default rootReducer;