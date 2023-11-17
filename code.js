const WIZARD_BASE_URL = 'https://wizard-world-api.herokuapp.com'

window.onload = async () => {

  const wizards = await getAllWizards();

  for (const wizard of wizards){
    const mainHtmlElement = document.getElementById('wizards');
    const newElement = document.createElement('div');
    newElement.innerHTML = `
    <h3>${wizard.firstName}</h3>
    `;
    mainHtmlElement.appendChild(newElement);
  }

}

async function getAllWizards(){
  const response = await fetch(`${WIZARD_BASE_URL}/Wizards`);
  const data = await response.json();
  return data.results;
}
