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
        
        case 'GET_TYPES':
            return{
                ...state,
                pokemonsTypes: action.payload
            }
        
        case 'GET_NAME_POKE':
            return{
                ...state,
                pokemons : action.payload
            }

        
        // case 'GET_POKE':
        //     let fullPoke = state.pokemonsFiltered;
        //     let onePoke = fullPoke.filter(p => p.name === action.payload )
        //     let noPoke = fullPoke
        //     return{
        //         ...state,
        //         pokemons: onePoke.length ? onePoke : noPoke.concat(alert("No hay ningun pokemon con ese nombre. Mostrando todos los pokemons:")),
        //         pokemonsTypes: action.payload
        //     }

        case 'RESET_DETAILS':
            return{
                ...state,
                pokemon:[]
            }

        case 'POST_POKEMON':
            return{
                ...state
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
            let orderPokemons = action.payload === "asc"?
            state.pokemons.sort(function(a, b) {
                if (a.name < b.name){
                    return -1
                }
                if (a.name > b.name){
                    return 1
                }
                return 0
            }):
            state.pokemons.sort(function(a, b) {
                if (a.name > b.name){
                    return -1
                }
                if (b.name > a.name){
                    return 1
                }
                return 0
            })
            return {
                ...state,
                pokemons : orderPokemons
            }
        case 'FILTER_BY_TYPE':
            const allPokemons = state.pokemonsFiltered;
            const typeFiltered = action.payload === 'all'? allPokemons:
            allPokemons.filter(pk => pk.types?.map(pk => pk).includes(action.payload))
            return{
                ...state,
                pokemons: typeFiltered
            }

        case 'ORDER_BY_ATTACK': //all, poderoso, debil
            let pokemonAttack = action.payload === 'debil' ?
            state.pokemons.sort(function(a, b) {
                if (a.attack < b.attack){
                    return -1
                }
                if (a.attack > b.attack){
                    return 1
                }
                return 0
            }):
            state.pokemons.sort(function(a, b) {
                if (a.attack > b.attack){
                    return -1
                }
                if (b.attack > a.attack){
                    return 1
                }
                return 0
            })
            return {
                ...state,
                pokemons : pokemonAttack
            }
        
        case 'FILTER_API': //pokes, api, db
            let pokes=[]
            if(action.payload ==='pokes'){
                pokes = state.pokemonsFiltered
            }else if(action.payload ==='db'){
                pokes = state.pokemonsFiltered.filter(p=> p.createInDb)
            }else if(action.payload ==='api'){
                pokes = state.pokemonsFiltered.filter(p=> !p.createInDb)
            }
            return{
                ...state,
                pokemons: pokes
            }
        



        default:
            return state
    }
}
export default rootReducer;