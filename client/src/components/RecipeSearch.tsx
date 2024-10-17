import React, { useState } from 'react';
import '../index.css';

interface Recipe {
  label: string;
  image: string;
  url: string;
}

interface RecipeHit {
  recipe: Recipe;
}

const addToRecipes = async (image: String, label: String, url: String) => {
  const token = localStorage.getItem('token'); // Retrieve the JWT token

    const response = await fetch('/api/users/my-recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Pass the token for authentication
        },
        body: JSON.stringify({ image, label, url }),
    });

    if (!response.ok) {
        throw new Error('Failed to add recipe');
    }

    const result = await response.json();
    return result;
}
const RecipeSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<RecipeHit[]>([]);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(query, e);
    if (!query) return;

    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=${import.meta.env.VITE_RECIPE_API_ID}&app_key=${import.meta.env.VITE_RECIPE_API_KEY}&from=0&to=5`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recipes.');
      }

      const data = await response.json();
      setRecipes(data.hits);
      setError('');
    } catch (err) {
      const errorMessage = (err as Error).message || 'An unknown error occurred.';
      setError(errorMessage);
      setRecipes([]);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Recipe Search</h1>
      <form className="mb-4" onSubmit={handleSearch}>
  <div className="simple-search-bar">
    <input
      type="text"
      className="form-control"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for a Recipe"
      aria-label="Recipe name"
    />
    <button
      id="submit"
      className="search-button"
      type="submit"
    >
      Go!
    </button>
  </div>
</form>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {recipes.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card" style={{ width: '30rem' }}>
              <img
                className="card-img-top"
                src={item.recipe.image}
                alt={item.recipe.label}
              />
              <div className="card-body">
                <h5 className="card-label">{item.recipe.label}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item" style={{ display: 'flex', alignItems: 'center' }}>
                  Add to My Recipes!
                  <button
                  onClick={() => addToRecipes(item.recipe.image, item.recipe.label, item.recipe.url)}
                    style={{
                      marginLeft: '10px',
                      width: '25px',
                      height: '25px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'lapis-lazuli',
                      color: 'white',
                      border: 'none',
                      fontSize: '0.75rem'
                    }}
                    className="btn btn-sm"
                  
                  >
                    ✔
                  </button>
                </li>
              </ul>
              <div className="card-body">
                <a href={item.recipe.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  View Recipe
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;

