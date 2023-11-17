const SWAPI_BASE_URL = 'https://wizard-world-api.herokuapp.com'

window.onload = async () => {

  const wizards = await getAllWizards();

  for (const wizard of wizards){
    const mainHtmlElement = document.getElementById('wizards');
    const newElement = document.createElement('div');
        newElement.innerHTML = ``;
  }

}

async function getAllWizards(){
  const response = await fetch(`${SWAPI_BASE_URL}/Wizards`);
  const data = await responde.json();
  return data.firstName;
}
