import { useState,useEffect } from 'react'
import './Login.css'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      window.location.href = '/';
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const {data} = await axios.post(
        'http://localhost:3000/api/login',
        { email, password },
        config
      )

     if(data.status==='success'){
      localStorage.setItem('authToken', data.token);
      window.location.href = '/home';
     } else{
          setError(data.message);
          setTimeout(() => {
            setError('');
          }, 5000);
     }
     
      
    } catch (error) {
      setError(error.toString());
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
        <div className="login-screen">
          <form onSubmit={loginHandler} className="login-screen__form">
            <h3 className="login-screen__title">Admin Login</h3>
            {error && <span className="error-message">{error}</span>}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                tabIndex={1}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password:{' '}
               
              </label>
              <input
                tabIndex={2}
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" tabIndex={3}>
              Login
            </button>
          </form>
        </div>
      );
    

}

export default Login