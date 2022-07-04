import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { getNamePoke } from "../actions";
// import { getPoke } from "../actions";
import '../Styles/SearchBar.css'


export default function Search(){
    const dispatch = useDispatch();
    const [name,setName] = useState("");

    const handleSearchBar = (e)=>{
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(getNamePoke(name))
    }

    return (
        <div>
            <input className="searchInput" type = "text" placeholder = "Buscar Pokemon..." onChange={(e)=> handleSearchBar(e)}/>
            <button className="pokeSearch" type = "submit" onClick={(e)=> handleSubmit(e)}>Buscar</button>
        </div>
    )

}