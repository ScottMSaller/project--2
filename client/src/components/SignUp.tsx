import { useState } from 'react';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function resetFields() {
    setUsername('');
    setEmail('');
    setPassword('');
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if(data.message == "Username or email already taken") {
        resetFields();
        return alert("Username or email already taken. Please try again.")
      }
      else if(data.message == "Error signing up user") {
        return alert("There was an error while signing up the user, please ensure all fields are completed and try again.");
      }

    } catch (error) {
      resetFields();
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2 className="text-center">Sign Up</h2>
      <p className="lead">Already have an account? <a href="/sign-in">Sign in</a></p>
    <form onSubmit={handleSubmit} className="mx-auto" style={{maxWidth: "60%"}}>
      <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
        className="form-control"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      </div>
      <div className="form-group mb-3">
      <label htmlFor="email">Email Address</label>
      <input
        className="form-control mb-0"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        className="form-control"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <button className="btn btn-primary text-center"type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default SignUp;
