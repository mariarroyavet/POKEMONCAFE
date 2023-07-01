let url = "https://pokeapi.co/api/v2/pokemon";
const createCard = async () => {
  try {
    const res = await fetch(url); //await es la promesa después de hacer la asincrona
    const data = await res.json(); //nombre y url
    data.results.forEach(async (pokemon) => {
      const response = await fetch(pokemon.url); //demás datos de la api
      const dataPokemon = await response.json();

      const [type1,type2] = dataPokemon.types.map( //Recorrer el arreglo
        (typePokemon) => typePokemon.type.name
      );

      const container = document.querySelector(".container");

      let pokeCard = document.createElement("div");
      pokeCard.className = "pokeCard";
      pokeCard.innerHTML = `
                <div class = "headerCard">
                    <p>${dataPokemon.name}</p>
                </div>
                <img class="imgPoke" src ="${dataPokemon.sprites.other["home"].front_default}">
                <i class = fa-sharp fa-regular fa-heart"></i>
                <div>
                <p>${dataPokemon.base_experience}</p>
                <button>Buy</button>
                `;
      container.appendChild(pokeCard); //lo que va dentro de las comillas es lo que está en el template
      pokeCard.setAttribute("type1",type1);
      pokeCard.setAttribute("type2",type2);
        });
  } catch (error) {
    alert("error en la url");
  }
};

const filter = document.querySelectorAll(".type");
filter.forEach((filterType) => {
  filterType.addEventListener("click", (event) => {
    event.preventDefault();
    const type = filterType.textContent.toLowerCase();
    filterByType(type); //Parámetro almacenado se envía a la función
  });
});

const filterByType =(type) => { 
  const cards = document.querySelectorAll(".pokeCard");
  cards.forEach((card) => { //recorrer la carta y coge el primer atributo, guarda, y luego con el segundo
    const cardType1 = card.getAttribute("type1");
    const cardType2 = card.getAttribute("type2");

    if (type === "all" || cardType1 === type || cardType2 === type) { //Si es tipo que me pasaron, coincide con el de la carta, entonces escondo o muestro la acarta
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
};

createCard();
