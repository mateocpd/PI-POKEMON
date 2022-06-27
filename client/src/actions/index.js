import axios from 'axios'

export function getPokemons(){
    return async function(dispatch){
        var poke = await axios.get('http://localhost:3001/pokemon')
        return dispatch({
            type: 'GET_POKEMONS',
            payload: poke.data
        })
    }
}

export function getPoke(payload){
    return({
        type: 'GET_POKE',
        payload
    })
}

export function getTypes(){
    return async (dispatch)=>{
        var types = await axios.get('http://localhost:3001/types')
        return({
            type: 'GET_TYPES',
            payload : types.data
        })
    }
}


export function orderByAbc (payload) {
    return {
        type: "ORDER_BY_ABC",
        payload
    }
}

export function filterByType (payload) {
    console.log(payload)
    return {
        type: "FILTER_BY_TYPE",
        payload
    }
}

