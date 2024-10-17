interface Recipe {
  imageUrl: string | undefined;
  id: number;
  image: string;
  label: string;
  title: string;
  url: string;
}

async function fetchLikedRecipes(userId: Number) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`api/users/${userId}/recipes`, {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${token}`, // Ensure token is sent
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const recipes = await response.json();
      return recipes;
    } else {
      console.error('Expected JSON, but received:', await response.text());
      throw new Error('Invalid content-type, expected JSON');
    }
  } catch (error) {
    console.error('Error fetching liked recipes:', error);
    return [];
  }
}

const user = JSON.parse(localStorage.getItem('user') || '{}');

import React, { useState, useEffect } from 'react';

async function displayRecipes(setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>) {
    const response = await fetchLikedRecipes(user.id);
    if (response) {
        setRecipes(response);
    }
}

function UserRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        displayRecipes(setRecipes);
    }, []);

    return(
        <div>
        {recipes.map((recipe: Recipe) => (
          <div className="col-md-4 mb-4" key={recipe.id}>
            <div className="card" style={{ width: '30rem' }}>
              <img
            className="card-img-top"
            src={recipe.imageUrl}
            alt={recipe.label}
              />
              <div className="card-body">
            <h5 className="card-label">{recipe.title}</h5>
              </div>
              
              <div className="card-body">
            <a href={recipe.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              View Recipe
            </a>
              </div>
            </div>
          </div>
        ))}

        </div>
    );
}

export default UserRecipes;