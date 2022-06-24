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