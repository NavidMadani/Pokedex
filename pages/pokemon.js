import React from 'react'
import Layout from "../component/Layout.js"
import Link from "next/link"

var color = "";

export default function pokemon({ pokeman }) {
    function typeColor(req){
        if(req === "grass" || req === "bug"){
            color = "text-green-500 capitalize text-center"
        }
        if(req === "poison"){
            color = "text-purple-500 capitalize text-center"
        }
        if(req === "fire"){
            color = "text-orange-500 capitalize text-center"
        }
        if(req === "water"){
            color = "text-blue-500 capitalize text-center"
        }
        if(req === "flying"){
            color = "text-blue-200 capitalize text-center"
        }
        if(req === "normal"){
            color = "text-yellow-500 capitalize text-center"
        }
        if(req === "ground"){
            color = "text-orange-900 capitalize text-center"
        }
        if(req === "psychic"){
            color = "text-purple-400 capitalize text-center"
        }
        if(req === "rock"){
            color = "text-gray-700 capitalize text-center"
        }
        if(req === "dragon"){
            color = "text-purple-700 capitalize text-center"
        }
        if(req === "ice"){
            color = "text-teal-200 capitalize text-center"
        }
        if(req === "dark"){
            color = "text-black capitalize text-center"
        }
        if(req === "electric"){
            color = "text-yellow-300 capitalize text-center"
        }
        if(req === "fighting"){
            color = "text-orange-600 capitalize text-center"
        }
        if(req === "fairy"){
            color = "text-pink-400 capitalize text-center"
        }
    }
    return (
        <Layout className="" title={pokeman.name}>
            <h1 className="text-4xl mb-2 text-center capitalize">{pokeman.name}</h1>
            <img className="mx-auto" src={pokeman.image} alt={pokeman.name}/>
            <p className="text-center"><span className="font-bold mr-2">Weight: </span>{pokeman.weight}</p>
            <p className="text-center"><span className="font-bold mr-2">Height: </span>{pokeman.height}</p>
            <h2 className="text-2xl mt-6 mb-2 text-center">Types</h2>
            {pokeman.types.map((type, index) => (
                <div>
                <a>{typeColor(type.type.name)}</a>
                <p className={color} key={index}>{type.type.name}</p>
                </div>
            ))}
            <p className="mt-10 text-center">
                <Link href="/">
                    <a className="text-2xl underline">Home</a>
                </Link>
            </p>
        </Layout>
    )
}


export async function getServerSideProps({ query }){
    const id = query.id
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await res.json();
        const paddedIndex = ("00" + id).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
        pokeman.image = image;
    return{
        props: {pokeman},
    };
    } catch (err){
        console.log(err);
    }
}