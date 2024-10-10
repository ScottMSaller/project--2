import React from 'react';
import SignUp from '../components/SignUp';
import '../index.css';

function Home() {
  return (
    <>
      <h1>Welcome to Recipe Boss</h1>
      <p>What's On The Menu Today?</p>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <input 
          type="text" 
          placeholder="Search for recipes!" 
          style={{ 
            width: '30rem', 
            padding: '0.5rem', 
            borderRadius: '5px', 
            border: '2px solid', 
            fontSize: '1rem'
          }} 
        />
      </div>
      <div className="center-container">
      <div className="card" style={{ width: '30rem' }}>
        <img className="card-img-top" src="https://worldfoodtour.co.uk/wp-content/uploads/2013/06/neptune-placeholder-48.jpg" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">Recipe Title</h5>
          <p className="card-text">
            Quick Description of Recipe
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item" style={{ display: 'flex', alignItems: 'center' }}>Add to My Recipes!
          <button 
              style={{ 
                marginLeft: '10px', 
                width: '25px', 
                height: '25px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: '--lapiz-lazuli', 
                color: 'white', 
                border: 'none', 
                fontSize:'0.75rem'
              }}
              className="btn btn-sm"
            >
              ✔
            </button>
          </li>
        </ul>
      </div>
    </div>
    <SignUp/>
    </>
  );
}

export default Home;
