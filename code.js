const WIZARD_BASE_URL = 'https://wizard-world-api.herokuapp.com'

window.onload = async () => {

  const wizards = await getAllWizards();

  for (const wizard of wizards){
    const mainHtmlElement = document.getElementById('wizards');
    const newElement = document.createElement('div');

    newElement.innerHTML = `<h1>${wizard.firstName}</h1>
    <button onclick="destacarPersonaje('${wizard.id}')" id="destacarPersonaje">Destacar</button>
    <p></p>`;

    if (wizard.firstName !== null){
      mainHtmlElement.appendChild(newElement);

      for (const elixir of wizard.elixirs){
        const newElement2 = document.createElement('div');
        newElement2.innerHTML =`
        <li class="elixir">${elixir.name} <button onclick="showIngredients('${elixir.id}')" id="showIngredients">Ingredientes</button></li>
        `
        mainHtmlElement.appendChild(newElement2);
      }
    }
  }

  const houses = await getAllHouses();

  for (const house of houses){
    const mainHtmlElement2 = document.getElementById('houses');
    const newElement2 = document.createElement('div');

    newElement2.innerHTML = `<div class="escudos ${house.name}">${house.name}<button onclick="destacarCasa('${house.id}')" id="destacarCasa">Destacar</button></div>`;
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

async function getWizardById(WizardId){
  const response = await fetch(`${WIZARD_BASE_URL}/Wizards/${WizardId}`);
  const data = await response.json();
  return data;
}

async function getHouseById(HouseId){
  const response = await fetch(`${WIZARD_BASE_URL}/Houses/${HouseId}`);
  const data = await response.json();
  return data;
}

async function showIngredients (elixirId){
  cerrarIngredients();
  document.getElementById('ingredients').style.display = 'block';
  const sectionHtmlElement = document.getElementById('ingredients');
  sectionHtmlElement.innerHTML = '';
  const ingredients = await getIngredientsBysElixirs(elixirId);

  for (const ingredient of ingredients){
    const sectionHtmlElement = document.getElementById('ingredients');
    const newElement = document.createElement('div');
    newElement.innerHTML = `<p>${ingredient.name}</p>`;
    sectionHtmlElement.appendChild(newElement);
  }
  const newElement2 = document.createElement('div');
}

function cerrarIngredients() {
  document.getElementById('ingredients').style.display = 'none';
}

function cerrarWizard() {
  document.getElementById('wizard').style.display = 'none';
}

function cerrarHouse() {
  document.getElementById('house').style.display = 'none';
}

async function destacarPersonaje(wizardId) {
  cerrarIngredients();
  cerrarWizard();
  document.getElementById('wizard').style.display = 'block';
  const sectionHtmlElement = document.getElementById('wizard');
  sectionHtmlElement.innerHTML = '';
  const wizard = await getWizardById(wizardId);

  const newElement = document.createElement('div');
  newElement.innerHTML = `
  <h1>${wizard.firstName}</h1>
  <p>${wizard.lastName}</p>
  <button class="botonWizard" onclick="cerrarWizard()">Cerrar</button>`;

  sectionHtmlElement.appendChild(newElement);
}

async function destacarCasa(houseId) {
  cerrarIngredients();
  cerrarHouse();
  document.getElementById('house').style.display = 'block';
  const sectionHtmlElement = document.getElementById('house');
  sectionHtmlElement.innerHTML = '';
  const house = await getHouseById(houseId);

  const newElement = document.createElement('div');
  newElement.innerHTML = `
  <h1>${house.name}</h1>
  <p>Colours: ${house.houseColours}</p>
  <p>Founder: ${house.founder}</p>
  <p>Animal: ${house.animal}</p>
  <p>Element: ${house.element}</p>
  <p>Ghost: ${house.ghost}</p>
  <p>Common Room: ${house.commonRoom}</p>
  <button class="botonHouse" onclick="cerrarHouse()">Cerrar</button>`;

  sectionHtmlElement.appendChild(newElement);
}
