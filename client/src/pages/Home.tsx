// import React from 'react';
import SignUp from '../components/SignUp';
import '../index.css';

function Home() {
  return (
    <>
    <h1>Welcome to Recipe Boss</h1>
      <p>Are you tired of trying to figure out what to eat for dinner?
       Are you tired of eating the same thing every night? 
      Recipe Boss is here to help! Recipe Boss is a website that allows you to search for recipes based on your cravings. 
      You can save your favorite recipes to your account and access them at any time. 
       We even provide a grocery store locator to help you find the nearest grocery store to you. 
       Recipe Boss is here to make your life easier and help you find the perfect recipe for your cravings!
      Please refer to the steps below to get started!</p>
    <h2>Step 1</h2>
      <h3>Use the sign up form below to create an account!</h3>
    <h2>Step 2</h2>
      <h3>Navigate to the search page and search for whatever craving you need satisfied today!</h3>
    <h2>Step 3</h2>
      <h3>When you have found the perfect recipe through the search results, click the check mark next to "Add to My Recipes!". This will then save your recipes to the "My Recipes" page!</h3>
    <h2>Step 4</h2>
      <h3>If you just so happen to be out of town or new to the area and you are out of a key ingredient, we have provided a Grocery Store Locator on the "Store Locator" page for your convenince!</h3>
    <SignUp/>
    </>
  );
}

export default Home;
