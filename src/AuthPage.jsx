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
    
    if (wantsSignIn) {
      const user = await signInUser(email, password);
      setUser(user);
    }
    else {
      const user = await signupUser(email, password, username);
      setUser(user);
    }
  }


  function handleSignInClick() {  
    setWantsSignIn(true);
  }

  return (

    <div className='auth'>
      <form
        onSubmit={handleSubmit}
      >
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
        {
          !wantsSignIn && <button>Sign Up</button>
        }
        {
          !wantsSignIn && <button
            onClick={handleSignInClick}
          >Already a user? Sign In...</button>
        }
        {
          wantsSignIn && <button>Sign In</button>
        }
      </form>
    </div>
  );
}
