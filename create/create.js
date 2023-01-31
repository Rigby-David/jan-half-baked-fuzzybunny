import { createBunny, getFamilies, checkAuth, logout } from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');
const selectEl = document.querySelector('.family-id');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const formData = new FormData(form);
    const nameData = formData.get('bunny-name');
    const idData = formData.get('family-id');
    console.log(nameData, idData);
    // use createBunny to create a bunny with this name and family id
    await createBunny(nameData, idData);
    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    // go get the families from supabase
    const response = await getFamilies();
    // for each family
    for (let family of response) {
        // create an option tag
        const option = document.createElement('option');
        // set the option's value and text content
        option.value = family.id;
        option.textContent = family.name;
        // and append the option to the select
        selectEl.append(option);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
