import UserRecipes from '../components/UserRecipes.js';
import { user, isLoggedIn } from '../util.js'

function MyRecipes() {
    if(isLoggedIn()){
        return(
            <div>
                <h1>{user.username}'s Recipes</h1>
                    <div id="recipe-container">
                        <UserRecipes/>
                    </div>
            </div>
        )
    }
    else return(
        <div>
            <h1>Whoops!</h1>
            <h3 className="lead">Looks like you're not logged in. If you want to track your favorite recipes and more, please <a href="/sign-in">sign in.</a> If you're new to us, please <a href="/sign-up">click here</a> to create an account!</h3>
        </div>
    )
    
}

export default MyRecipes;