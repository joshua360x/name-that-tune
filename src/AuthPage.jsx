import React from 'react';
import { useState } from 'react';
import { signupUser, signInUser } from './services/fetch-utils';

export default function AuthPage({ setUser }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [wantsSignIn, setWantsSignIn] = useState(false);
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    // this is a good use case for a ternary, since the result of the ternary is a decision about which of two values to assign to a variable
    const user = wantsSignIn 
      ? await signInUser(email, password) 
      : await signupUser(email, password, username);

    setUser(user)
  }


  function handleSignInClick() {  
    setWantsSignIn(true);
  }

  return (

    <div className='auth'>
      <h1>TUNIFY</h1>
      <form className='login-form'
        onSubmit={handleSubmit}
      >
        <div className='inputs'>
          <label>
          Email: 
            <input 
              type='email'
              onChange={(e)=> setEmail(e.target.value)}
              name='email'
              required
            ></input>
          </label>
          {
            !wantsSignIn && <label>
          Username:
              <input
                onChange={(e)=> setUsername(e.target.value)}
                name='username'
              ></input>
            </label>
          }
          <label>
          Password:
            <input
              onChange={(e)=> setPassword(e.target.value)}
              type='password'
              name='password'
            ></input>
          </label>
        </div>

        <div className='buttons'>
          {
            !wantsSignIn 
              ? <>
                  <button
                    onClick={handleSignInClick}>
                      Already a user? Sign In...
                  </button>
                  <button>Sign Up</button>
                </>
              : <button>Sign In</button>
          }

        </div>
      </form>
    </div>
  );
}
