import React, { useState } from 'react';

interface Recipe {
  label: string;
  image: string;
  url: string;
}

interface RecipeHit {
  recipe: Recipe;
}

const RecipeSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<RecipeHit[]>([]);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter recipe name"
            aria-label="Recipe name"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
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
                <h5 className="card-title">{item.recipe.label}</h5>
                <p className="card-text">Quick Description of Recipe</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item" style={{ display: 'flex', alignItems: 'center' }}>
                  Add to My Recipes!
                  <button
                    style={{
                      marginLeft: '10px',
                      width: '25px',
                      height: '25px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'lapis-lazuli', // Update this color if needed
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

