const WIZARD_BASE_URL = 'https://wizard-world-api.herokuapp.com'

window.onload = async () => {

  const wizards = await getAllWizards();

  for (const wizard of wizards){
    const mainHtmlElement = document.getElementById('wizards');
    const newElement = document.createElement('div');

    newElement.innerHTML = `<h1>${wizard.firstName}</h1><button onclick="destacarPersonaje('${wizard.firstName}')" id="destacarPersonaje">Destacar</button>`;

    if (wizard.firstName !== null){
      mainHtmlElement.appendChild(newElement);

      for (const elixir of wizard.elixirs){
        const newElement2 = document.createElement('div');
        newElement2.innerHTML =`
        <p>${elixir.name}</p>
        <button onclick="showIngredients('${elixir.id}')" id="showIngredients">Ingredientes</button>`
        mainHtmlElement.appendChild(newElement2);
      }
    }
  }

  const houses = await getAllHouses();
  for (const house of houses){
    const mainHtmlElement2 = document.getElementById('houses');
    const newElement2 = document.createElement('div');

    newElement2.innerHTML = `<h1>${house.name}</h1><button onclick="destacarCasa('${house.name}')" id="destacarCasa">Destacar</button>`;
    mainHtmlElement2.appendChild(newElement2);
  }
}

async function getAllWizards(){
  const response = await fetch(`${WIZARD_BASE_URL}/Wizards`);
  const data = await response.json();
  return data;
}

async function getAllHouses(){
  const response = await fetch(`${WIZARD_BASE_URL}/Houses`);
  const data = await response.json();
  return data;
}

async function getIngredientsBysElixirs(elixirId){
  const response = await fetch(`${WIZARD_BASE_URL}/Elixirs/${elixirId}`);
  const data = await response.json();
  return data.ingredients;
}

async function showIngredients (elixirId){
  const ingredients = await getIngredientsBysElixirs(elixirId);

  for (const ingredient of ingredients){
    const sectionHtmlElement = document.getElementById('ingredients');
    const newElement = document.createElement('div');
    newElement.innerHTML = `<p>${ingredient.name}</p>`;
    sectionHtmlElement.appendChild(newElement);
  }
}
