async function fetchLikedRecipes(userId: Number) {
    try {
      const response = await fetch(`/api/users/${userId}/recipes`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const recipes = await response.json();
      return recipes;
    } catch (error) {
      console.error('Error fetching liked recipes:', error);
    }
  }

const user = JSON.parse(localStorage.getItem('user') || '{}');

async function displayRecipes() {
    const response = await fetchLikedRecipes(user.id);
    
}

displayRecipes();
function UserRecipes() {
    return(
        <div>
        

        </div>
    );
}

export default UserRecipes;