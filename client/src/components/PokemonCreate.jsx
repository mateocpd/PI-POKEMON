import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { postPoke, getTypes } from '../actions'
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';


export default function PokeCreate(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allTypes = useSelector((state) => state.pokemonsTypes)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name : '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
        img: ""
    })

    function validation(input){
        let errors = [];
        if(!input.name || typeof input.name !== 'string'){
            errors.name = 'Que nombre le pondrás a tu pokemon?'
        } else if(!input.hp || input.hp < 0 || input.hp > 100 || typeof input.hp !== 'number'){
            errors.hp = 'Por favor inserte un numero de vida valido entre 0 y 100';
        } else if(!input.attack || input.attack < 0 || input.attack > 100 || typeof input.attack !== 'number'){
            errors.attack = 'Por favor inserte un ataque valido entre 0 y 100'
        } else if(!input.defense || input.defense < 0 || input.defense > 100 || typeof input.defense !== 'number'){
            errors.defense = 'Por favor inserte una defensa valida entre 0 y 100'
        } else if(!input.speed || input.speed < 0 || input.speed > 100 || typeof input.speed !== 'number'){
            errors.speed = 'Por favor inserte una velocidad valida entre 0 y 100'
        } else if(!input.height || input.height < 0 || input.height > 100 || typeof input.height !== 'number'){
            errors.height = 'Por favor inserte una altura valida entre 0 y 100'
        } else if(!input.weight || input.weight < 0 || input.weight > 100 || typeof input.weight !== 'number'){
            errors.weight = 'Por favor inserte un peso valid entre 0 y 100'
        } else if(!input.types){
            errors.types= 'Seleccionar entre 1 y 3 tipos'
        } else if(!input.img){
            errors.img = 'Por favor inserte un URL valido'
        }
        return errors
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validation({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input);
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e){
        console.log(input);
        if(!input.name){
            e.preventDefault();
            return alert('No es posible crear un pokemon sin un nombre')
        } else if (!input.types.length){
            e.preventDefault();
            return alert('Por favor seleccione al menos 1 tipo')
        } else if (!input.img){
            e.preventDefault();
            return alert('Por favor inserte un URL valido')
        }
        dispatch(postPoke(input));
        alert('Pokemon creado con exito!')
        setInput({
            name : '',
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            types: [],
            img: ""
        })
        navigate('/')
    }

    let handleDelete = (type)=>{
        setInput({
            ...input,
            types: input.types.filter(pk => pk !== type)
        })
    }

    return(
        <div>
            
        </div>
    )
}

