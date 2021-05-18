import { useState } from "react";
import Layout from "../component/Layout.js";
import Link from "next/link";
import PokeCounter from "../component/PokeCounter.js";

export default function Home({ pokemon }) {
	let [pokemonCaught, setPokemonCaught] = useState(0);
	let [pokemonCaughtList, setPokemonCaughtList] = useState([]);

	function caught(e, id) {
		let list = pokemonCaughtList;

		if (e.target.checked) {
			pokemonCaught++;
			setPokemonCaught(pokemonCaught);
			list.push(id);
			setPokemonCaughtList(list);
		}
		if (!e.target.checked) {
			pokemonCaught--;
			setPokemonCaught(pokemonCaught);
			list = list.filter((i) => i !== id);
			setPokemonCaughtList(list);
		}
		console.log(pokemonCaughtList);
	}

	function caughtClear() {
		//create for loop to clear all checkboxes
		let list = [];
		setPokemonCaughtList(list);
		setPokemonCaught(0);
	}

	function caughtAll() {
		let list = [];
		for (let i = 0; i <= 150; i++) {
			list.push(i);
		}
		setPokemonCaught(150);
		setPokemonCaughtList(list);
	}

	return (
		<Layout title="NextJS Pokedex">
			<style jsx>{`
				.toggle-checkbox:checked {
					-webkit-transform: translateX(16.07px);
					-ms-transform: translateX(16.07px);
					transform: translateX(16.07px);
					border-color: #68d391;
				}
				.toggle-checkbox:checked + .toggle-label {
					background-color: #68d391;
					transition: all 0.5s ease-in-out;
				}
				.secondary-gray {
					background-color: #282e32;
				}
				.black {
					background-color: #131313;
				}
			`}</style>
			<div className="right-0 fixed pr-1">
				<PokeCounter num={pokemonCaught} />
			</div>
			<div className="right-0 fixed pr-1 pt-5">
				<button onClick={() => caughtClear()}>X</button>
				<button onClick={() => caughtAll()}>✓</button>
				<button>⤺</button>
			</div>
			<h1 className="text-4xl mb-8 text-center text-white">NextJS Pokedex</h1>

			<ul className="items-center justify-center lg:flex md:flex  flex-wrap">
				{pokemon.map((pokeman, index) => (
					<li
						className="sm:w-1/2  md:1/2 lg:w-1/4 2xl:w-1/6 h-full flex-wrap transition-all duration-100"
						key={index}
					>
						<Link href={`/pokemon?id=${index + 1}`}>
							<a className="items-center overflow-hidden p-4 border-gray my-1 mx-2 capitalize flex text-lg rounded-md secondary-gray text-white">
								<img
									className="w-20 h-20 mr-3"
									src={pokeman.image}
									alt={pokeman.name}
								/>
								<span className="mr-2 font-bold text-white">{index + 1}.</span>
								{pokeman.name}
							</a>
						</Link>
						<div className="relative mx-2 inline-block w-10 mr-2 align-middle select-none">
							<input
								type="checkbox"
								onChange={(e) => caught(e, index)}
								name="toggle"
								id={index}
								checked={pokemonCaughtList.includes(index) ? true : false}
								className="toggle-checkbox absolute block w-6 h-6 rounded-full black appearance-none cursor-pointer transition duration-500 ease-in-out"
							/>
							<label
								htmlFor="toggle"
								name="toggle"
								className="toggle-label block overflow-hidden h-6 rounded-full secondary-gray cursor-pointer transition duration-500 ease-in-out"
							></label>
						</div>
						<label htmlFor="toggle" className="text-xs text-gray-300">
							Captured
						</label>
						<div className="flex items-center justify-center w-full"></div>
					</li>
				))}
			</ul>
		</Layout>
	);
}

export async function getStaticProps(context) {
	try {
		const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
		const { results } = await res.json();
		const pokemon = results.map((pokeman, index) => {
			const paddedIndex = ("00" + (index + 1)).slice(-3);
			const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
			return { ...pokeman, image };
		});
		return {
			props: { pokemon },
		};
	} catch (err) {
		console.error(err);
	}
}
