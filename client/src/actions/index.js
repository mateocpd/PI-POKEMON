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

export function resetDetails(){
    return(
        dispatch =>{dispatch({type: 'RESET_DETAILS'})}
    )
}

export function getDetails(id){
    return async function(dispatch) {
        try{
            let poke = await axios.get(`http://localhost:3001/pokemon/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: poke.data
            })
        }catch(e){
            console.log(e)
        }
    }
}


export function getNamePoke(name){
    return async function(dispatch) {
        try{
            var json = await axios.get('http://localhost:3001/pokemon?name=' + name);
            console.log(json)
            return dispatch({
                type: 'GET_NAME_POKE',
                payload: json.data
            }) 
        }catch(err){
            console.error(err)
            alert('Pokemon no encontrado')
        }
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
        return dispatch({
            type: 'GET_TYPES',
            payload : types.data
        })
    }
}

export function postPoke(payload) {
    return async function (dispatch) {
        const pokemonCreated = axios.post("http://localhost:3001/pokemon", payload)
        return dispatch({type: "POST_POKEMON",
         payload: pokemonCreated})
    }
}

export function reload(payload){
    return {
        type: 'RELOAD',
        payload
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

export function orderByAttack(payload){
    return {
        type: "ORDER_BY_ATTACK",
        payload
    }
}

export function filterApi (payload) {
    return {
        type: "FILTER_API",
        payload
    }
}
