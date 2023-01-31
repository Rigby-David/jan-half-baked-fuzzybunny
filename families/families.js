import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    console.log('families', families);
    // clear out the familiesEl
    familiesEl.textContent = '';
    // loop through each family and for each family:
    for (let family of families) {
        // create three elements: an outer container then two children: one to hold the name and one to hold the bunnies

        const familyDiv = document.createElement('div');
        const h3 = document.createElement('h3');
        const bunniesDiv = document.createElement('div');
        // const bunnyNameDiv = document.createElement('div');
        // const familyNameDiv = document.createElement('div');

        // your HTML Element should look like this:
        // <div class="family">
        //    <h3>the Garcia family</h3>
        //    <div class="bunnies">
        //        <div class="bunny">Fluffy</div>
        //        <div class="bunny">Bob</div>
        //    </div>
        // </div>

        // add the bunnies css class to the bunnies el, and family css class to the family el

        familyDiv.classList.add('family');
        bunniesDiv.classList.add('bunnies');
        // bunnyNameDiv.classList.add('bunny');
        // familyNameDiv.classList.add('bunny');
        h3.textContent = family.name;
        // put the family name in the family element
        familyDiv.append(h3);

        // for each of this family's bunnies
        const bunnies = family.fuzzy_bunnies;
        for (let bunny of bunnies) {
            console.log('bunny', bunny.id);
            //    make an element with the css class 'bunny', and put the bunny's name in the text content
            const bunnyDiv = document.createElement('div');
            bunnyDiv.classList.add('bunny');
            bunnyDiv.textContent = bunny.name;
            //    add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
            bunnyDiv.addEventListener('click', async () => {
                await deleteBunny(bunny.id);
                displayFamilies();
            });
            // append this bunnyEl to the bunniesEl
            bunniesDiv.append(bunnyDiv);
        }
        familyDiv.append(bunniesDiv);
        familiesEl.append(familyDiv);
    }
    // append the bunniesEl and nameEl to the familyEl
    // append the familyEl to the familiesEl
}

window.addEventListener('load', async () => {
    const families = await getFamilies();

    displayFamilies(families);
});
