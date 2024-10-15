import { useState } from 'react';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const { token, user  } = await response.json();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert(`${user.username} is successfully logged in!`);
      window.location.href = "/"
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Login failed: ${error.message}`);
      } else {
        alert('Login failed: An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h2 className="text-center">Sign In</h2>
      <p className="lead">Don't have an account? <a href="/sign-up">Sign up</a></p>
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
    <div id="error-container" style={{display: "none", color: "red"}}></div>
    </div>
  );
};

export default SignIn;