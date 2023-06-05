 let pokemons = [];
const poke_container = document.getElementById("poke_container");
const url="https://pokeapi.co/api/v2/pokemon";
const pokemons_number = 52;
const search = document.getElementById("search");
const form = document.getElementById("form");

const fetchpokemons = async () =>{
    for(let i=1;i<=pokemons_number;i++){
        await getallpokemon(i);
    }
    pokemons.forEach((pokemon) => createpokemonCard(pokemon));
};

const removepokemon = () => {
    const pokemonEls = document.getElementsByClassName("pokemon");
    let removeablepokemons = [];
    for(let i=0; i<pokemonEls.length;i++){
        const pokemonEl = pokemonEls[i];
        removeablepokemons =[...removeablepokemons,pokemonEl];
    }
    removeablepokemons.forEach((rempok)=>rempok.remove());
};
const getpokemon = async(id)=>{
    const searchpokemons=pokemons.filter((poke) => poke.name === id);
    removepokemon();
    searchpokemons.forEach((pokemon) => createpokemonCard(pokemon));
};
const getallpokemon = async (id) => {
    const res =await fetch(`${url}/${id}`);
    const pokemon =await res.json();
    pokemons=[...pokemons,pokemon];
};
fetchpokemons();

function createpokemonCard(pokemon) {
    const pokemonEl =document.createElement("div");
    pokemonEl.classList.add("pokemon");
    const poke_types=pokemon.types.map((el) => el.type.name).slice(0,1);
    const name= pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const move= pokemon.moves[0].move.name;
    const poke_weight=pokemon.weight
    const poke_stat=pokemon.stats.map((el)=>el.stat.name);
    const stats = poke_stat.slice(0,3);
    const base_value =pokemon.stats.map((el)=>el.base_stat);
    const base_stat =base_value.slice(0,3);
    const stat =stats.map((stat) => {
        return `<li class="names">${stat}</li>`;
    }).join("");
    const base =base_stat.map((base) => {
        return `<li class="base">${base}</li>`;
    }).join("");
    const pokeInnerHTML =`<div class="img-container">
    <img src ="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}"/>
    </div>
    <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
            <h3 class="name">${name}</h3>
            <h4>moves</h4>
            <medium class="move">${move}<medium>

            <small class="type"><span>${poke_types}</span></small>
            <h2>Weight :</h2>
            <medium class="weight"><span>${poke_weight}</span></medium>

        </div>
        <div class="stats">
            <h2>stats</h2>
            <div class="flex">
                <ul>${stat}</ul>
                <ul>${base}</ul>
            </div>
         </div>`;
    pokemonEl.innerHTML = pokeInnerHTML;
    poke_container.appendChild(pokemonEl);
}

form.addEventListener("submit",(e) =>{
    e.preventDefault();
    const searchTerm = search.nodeValue;
    if(searchTerm){
        getpokemon(searchTerm);
        search.value = "";
    }else if(searchTerm===""){
        pokemons =[];
        removepokemon();
        fetchpokemons();

    }

    
});