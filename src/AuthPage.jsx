import React from 'react';
import { useState } from 'react';

export default function AuthPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  
  async function handleSubmit() {


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
        <label>
          Username:
          <input
            onChange={(e)=> setUsername(e.target.value)}
          ></input>
        </label>
        <label>
          Password:
          <input></input>
        </label>
      </form>
    </div>
  );
}
