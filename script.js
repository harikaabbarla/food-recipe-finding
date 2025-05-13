document.getElementById('searchBtn').addEventListener('click', searchRecipes);

async function searchRecipes() {
    const ingredient = document.getElementById('ingredient').value.trim();
    if (!ingredient) {
        alert('Please enter an ingredient.');
        return;
    }

    const apiKey = '39c541b5705f4fe4b2afb51fabb3ac7a'; // 🔁 Replace with your real API key
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&number=12&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            alert('No recipes found.');
            return;
        }

        displayRecipes(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Something went wrong. Please try again later.');
    }
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        recipeElement.innerHTML = `
            <img src="https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>Recipe ID: ${recipe.id}</p>
        `;

        recipeElement.addEventListener('click', () => openModal(recipe));
        recipesContainer.appendChild(recipeElement);
    });
}

function openModal(recipe) {
    document.getElementById('modalTitle').textContent = recipe.title;
    document.getElementById('modalDescription').textContent = 'Click below to view the full recipe.';
    document.getElementById('modalLink').href = `https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}`;
    document.getElementById('recipeModal').style.display = 'block';
}

document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('recipeModal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('recipeModal')) {
        document.getElementById('recipeModal').style.display = 'none';
    }
});
