import React from 'react';

export default function AuthPage() {
  
  async function handleSubmit() {


  }
  return (

    <div className='auth'>
      <form
        onSubmit={handleSubmit}
      >
        <label>
          Email: 
          <input></input>
        </label>
        <label>
          Profile Name:
          <input></input>
        </label>
        <label>
          Password:
          <input></input>
        </label>
      </form>
    </div>
  );
}
