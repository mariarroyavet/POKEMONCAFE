let url = "https://pokeapi.co/api/v2/pokemon";
const createCard = async() => {
    try {
        const res = await fetch(url); //await es la promesa después de hacer la asincrona
        const data = await res.json();  //nombre y url
        data.results.forEach(async (pokemon) => {
            const response = await fetch(pokemon.url); //demaás datos de la api
            const dataPokemon = await response.json();

            const container = document.querySelector(".container");

            let pokeCard = document.createElement('div');
            pokeCard.className = "pokeCard";
            pokeCard.innerHTML = `
                <div class = "headerCard">
                    <p>${dataPokemon.name}</p>
                </div>

                <img class="imgPoke" src ="${dataPokemon.sprites.other["home"].front_default}">
                
                `
                container.appendChild(pokeCard); //lo que va dentro de las comillas es lo que está en el template
                
        });
        
    } catch (error) { 
        alert ("error en la url");
    } 
} 

createCard();