// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * A9
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	return JSON.parse(localStorage.getItem('recipes')) || [];
}

/**
 * A10–A11
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	const main = document.querySelector('main'); // A10
	recipes.forEach(recipe => { // A11
		const recipeCard = document.createElement('recipe-card');
		recipeCard.data = recipe;
		main.appendChild(recipeCard);
	});
}

/**
 * B1
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * B2–B13
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	const form = document.getElementById('new-recipe'); // B2

	// B3
	form.addEventListener('submit', event => {
		event.preventDefault();

		// B4
		const formData = new FormData(form);

		// B5
		const recipeObject = {};
		formData.forEach((value, key) => {
			recipeObject[key] = value;
		});

		// Ensure numeric types for rating and numRatings
		recipeObject.rating = parseInt(recipeObject.rating);
		recipeObject.numRatings = parseInt(recipeObject.numRatings);

		// B6
		const recipeCard = document.createElement('recipe-card');

		// B7
		recipeCard.data = recipeObject;

		// B8
		document.querySelector('main').appendChild(recipeCard);

		// B9
		const recipes = getRecipesFromStorage();
		recipes.push(recipeObject);
		saveRecipesToStorage(recipes);
	});

	// B10
	const clearButton = document.querySelector('button.danger');

	// B11
	clearButton.addEventListener('click', () => {
		// B12
		localStorage.clear();

		// B13
		document.querySelector('main').innerHTML = '';
	});
}
