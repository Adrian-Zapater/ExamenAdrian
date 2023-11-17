const WIZARD_BASE_URL = 'https://wizard-world-api.herokuapp.com'

window.onload = async () => {

  const wizards = await getAllWizards();

  for (const wizard of wizards){
    const mainHtmlElement = document.getElementById('wizards');
    const newElement = document.createElement('div');

    newElement.innerHTML = `<h2>${wizard.firstName}</h2>`;

    if (wizard.firstName !== null){
      mainHtmlElement.appendChild(newElement);

      for (const elixir of wizard.elixirs){
        const newElement2 = document.createElement('div');
        newElement2.innerHTML =`
        <p>${elixir.name}</p>
        <button onclick="showIngredients({ id: ${elixir.id} )" id="showIngredients">Ingredientes</button>`
        mainHtmlElement.appendChild(newElement2);
      }
    }
  }
}



async function getAllWizards(){
  const response = await fetch(`${WIZARD_BASE_URL}/Wizards`);
  const data = await response.json();
  return data;
}

async function getIngredientsBysElixirs(elixirId){
  const response = await fetch(`${WIZARD_BASE_URL}/Elixirs/${elixirId}`);
  const data = await response.json();
  return data;
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
