const searchPokemon = (pokemon) => {
    const { types } = pokemon;
    const cardContainer = document.querySelector('.card-container');
    const card = document.createElement('div');
    card.className = 'd-flex justify-content-center'
    card.innerHTML = '<div class="card" style="width: 18rem;"><img src="..." class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"></h5><p class="card-text"></p></div></div>';
    cardContainer.appendChild(card);
    document.querySelector('.card-img-top').src = pokemon.sprites.front_shiny;
    document.querySelector('.card-title').innerHTML = `${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}`;
    document.querySelector('.card-text').innerHTML = `Type 1: ${types[0].type.name[0].toUpperCase() + types[0].type.name.slice(1)} `;
}
const renderPokemonList = (res) => {
    res.results.forEach((pokemon, index) => {
        const li = document.createElement('li');
        li.classList.add(`pokemon-${index+1}`, "list-group-item")
        document.querySelector('.list-group').appendChild(li)
        li.innerHTML= `<button class="btn btn-link">${pokemon.name}</button>`
        document.querySelector(`.pokemon-${index+1}`).onclick = () => renderPokemon(index+1)
    })
}
const notFoundPokemon = (pokemon) => {
    const cardContainer = document.querySelector('.card-container');
    const card = document.createElement('div');
    card.className = 'd-flex justify-content-center';
    card.innerHTML = '<div class="alert alert-danger" role="alert"></div>';
    cardContainer.appendChild(card);
    document.querySelector('.alert-danger').innerHTML = `We can not find your pokemon: ${pokemon}`
}
const clearElement = () => {
    const cardContainer = document.querySelector('.card-container');
    const input = document.querySelector('input');
    const ul = document.querySelector('ul');
    cardContainer.innerHTML = '';
    ul.innerHTML = '';
    input.value = '';
}
const getAllPokemons = async (pokemon) => {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/`
        let res = await fetch(url);
        let jsonRes = await res.json();
        clearElement();
        renderPokemonList(jsonRes);
    } catch (error) {
        console.log(error)
    }
}
const renderPokemon = async (pokemon) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        const fetchUrl = await fetch(url);
        const resJson = await fetchUrl.json();
        clearElement();
        searchPokemon(resJson);
    } catch (error) {
        clearElement();
        notFoundPokemon(pokemon);
    }
}
window.onload = () => {
    const btnPrimary = document.querySelector('#btnSearch');
    const fetchThemAll = document.querySelector('#fetch-all');

    btnPrimary.addEventListener('click', () => {
        const inputValue = document.querySelector('.form-control').value;
        inputValue && renderPokemon(inputValue);
    })

    fetchThemAll.addEventListener('click', () => {
        getAllPokemons()
    })
}